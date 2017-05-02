'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');
var jshint = require('gulp-jshint');
var testServer = require('karma').Server;
var ngConstant = require('gulp-ng-constant');
var argv = require('yargs').argv;
var injectVersion = require('gulp-inject-version');
var debug = require('gulp-debug');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var series = require('stream-series');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var runSequence = require('run-sequence');
var fs = require('fs');
var package_json = JSON.parse(fs.readFileSync('package.json'));
var version = package_json['version'];
var artifact_name = package_json['artifact_name'];

var env = argv.env || 'dev';

/**
 *  BUILD PATH
 *  Tasks for building the deployable
 */
gulp.task('build-root', function () {
    return gulp
        .src(['web-app/index.html', 'web-app/unsupported.html','web-app/logout.html','web-app/landing.html','web-app/error.html','web-app/favicon.ico'])
        .pipe(injectVersion())
        .pipe(gulp.dest('dist'))
});

var libs = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/jquery-ui/jquery-ui.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/angular-messages/angular-messages.min.js',
    'bower_components/angular-cookies/angular-cookies.min.js',
    'bower_components/angular-ui-sortable/sortable.min.js',
    'bower_components/angular-cookies/angular-cookies.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/moment/min/moment.min.js',
    'bower_components/moment-timezone/builds/moment-timezone-with-data.min.js',
    'bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
    'bower_components/angular-date-time-input/src/dateTimeInput.js',
    'bower_components/ng-table/dist/ng-table.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/angular-tooltips/dist/angular-tooltips.min.js',
    'bower_components/bowser/src/bowser.js',
    'bower_components/lodash/dist/lodash.js',
    'bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js',
    'bower_components/angular-utils-pagination/dirPagination.js'
];

gulp.task('build-lib', function() {
    return gulp.src(libs)
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('build-index-lib', function () {
    var libStreams = [];

    for (var i=0; i<libs.length; i++) {
        var file = libs[i].split("/").pop();
        var stream = gulp.src('./dist/lib/' + file, {read: false});
        libStreams.push(stream);
    }

    var opts = {
        name: 'lib', relative: true
    };
    return gulp.src('./dist/index.html')
        .pipe(inject(series(libStreams), opts))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-js', function() {
    return gulp
        .src(['web-app/app/**/*.module.js', 'web-app/app/**/*.js', '!web-app/app/**/*spec.js'])
        .pipe(concat('mydetail.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('build-index-app', function () {
    return gulp.src('./dist/index.html')
        .pipe(inject(gulp.src('./dist/js/mydetail.js', {read: false}), {name: 'app', relative: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-css', function() {
    return gulp
        .src(['bower_components/bootstrap/dist/css/bootstrap.min.css',
                'bower_components/font-awesome/css/font-awesome.min.css',
                'bower_components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
                'bower_components/ng-table/dist/ng-table.min.css',
                'bower_components/angular-tooltips/dist/angular-tooltips.min.css',
                'web-app/css/**/*.css'])
        .pipe(concat('mydetail.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('build-images', function () {
    return gulp
        .src('web-app/images/**')
        .pipe(gulp.dest('dist/images'))
});

gulp.task('build-fonts', function () {
    return gulp
        .src('bower_components/font-awesome/fonts/**')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('build-templates', function () {
    return gulp.src('web-app/app/**/*.html')
        .pipe(templateCache('templates.js', {"standalone":true}))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('clean', function () {
    return del([
        'dist/**/*'
    ]);
});

gulp.task('build', function() {
    if (env == null) {
        env = 'dev';
    }
    return runSequence('clean',
        ['build-root', 'build-lib', 'build-images', 'build-js-dev', 'build-css', 'build-templates', 'env', 'build-fonts', 'add-bulk-template'],
        'build-index-app-dev',
        'build-index-lib',
        'archive'
        );
});

gulp.task('archive', function() {
    return gulp.src('dist/**/*')
        .pipe(tar(artifact_name + '-' + version))
        .pipe(gzip({ extension: 'tgz' }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('run-build', ['build', 'connect']);

/**
 * Tasks for running in development mode (not minifying, etc)
 */
gulp.task('jshint', function() {
    gulp.src('web-app/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch-js', function () {
    gulp.watch(['web-app/**/*.js','./mydetail.conf.json'], ['build-dev'])
});

gulp.task('watch-css', function () {
    gulp.watch('web-app/css/**/*.css', ['build-dev'])
});

gulp.task('watch-html', function () {
    gulp.watch(['web-app/app/**/*.html','web-app/index.html', 'web-app/logout.html', 'web-app/landing.html'], ['build-dev'])
});

gulp.task('env', function() {
    var myConfig = require('./mydetail.conf.json');
    console.log("Building Env: " + env);
    var envConfig = myConfig[env];
    return ngConstant({
        name: 'mydetail.common.config',
        constants: envConfig,
        stream: true
    })
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('test', ['build-dev'], function (done) {
    new testServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        debug: true
    }, done).start();
});

gulp.task('test-build', ['build'], function (done) {
    new testServer({
        configFile: __dirname + '/karma.conf.build.js',
        singleRun: true,
        debug: true
    }, done).start();
});

gulp.task('test-coverage', ['build-dev'], function (done) {
    new testServer({
        configFile: __dirname + '/karma.conf.coverage.js',
        singleRun: true,
        debug: true
    }, done).start();
});

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: 4040
    })
});

gulp.task('add-bulk-template', function() {
    return gulp.src('web-app/templates/*')
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('build-js-dev', function() {
    return gulp
        .src(['web-app/app/**/*.module.js', 'web-app/app/**/*.js', '!web-app/app/**/*spec.js'])
        .pipe(gulp.dest('dist/js'))
});

gulp.task('build-index-app-dev', function () {
    return gulp.src('./dist/index.html')
        .pipe(inject(
            gulp.src(['dist/js/**/*.js'])
                .pipe(angularFilesort()),
            {name: 'app', ignorePath:'dist', addRootSlash:false}))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-dev', function() {
    runSequence('clean',
        'env',
        ['build-root', 'build-lib', 'build-images', 'build-js-dev', 'build-css', 'build-templates', 'build-fonts', 'add-bulk-template'],
        'build-index-app-dev',
        'build-index-lib',
        'jshint'
    );
});

gulp.task('default', function() {
    return runSequence('build-dev',
        ['watch-js', 'watch-css', 'watch-html', 'connect']
    );

});
