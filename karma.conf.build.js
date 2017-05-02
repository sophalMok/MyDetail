// Karma configuration
// Generated on Mon Jan 18 2016 13:47:04 GMT-0600 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        './dist/bower_components/jquery/dist/jquery.min.js',
        './dist/bower_components/jquery-ui/jquery-ui.min.js',
        './dist/bower_components/angular/angular.min.js',
        './dist/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './dist/bower_components/angular-messages/angular-messages.min.js',
        './dist/bower_components/angular-cookies/angular-cookies.min.js',
        './dist/bower_components/angular-animate/angular-animate.min.js',
        './dist/bower_components/moment/min/moment.min.js',
        './dist/bower_components/moment-timezone/builds/moment-timezone-with-data.min.js',
        './dist/bower_components/angular-ui-sortable/sortable.min.js',
        './dist/bower_components/angular-bootstrap/ui-bootstrap.min.js',
        './dist/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        './dist/bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
        './dist/bower_components/angular-date-time-input/src/dateTimeInput.js',
        './dist/bower_components/lodash/dist/lodash.js',
        './dist/bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js',
        './dist/bower_components/bootstrap/dist/js/bootstrap.min.js',
        './dist/bower_components/angular-mocks/angular-mocks.js',
        './bower_components/ng-table/dist/ng-table.min.js',
        './bower_components/angular-tooltips/dist/angular-tooltips.min.js',
        './dist/js/ngConstants.js',
        './dist/js/templates.js',
        './dist/js/mca3.js',
        './dist/lib/bowser.js',
        './web-app/app/**/*spec.js'
    ],


    // list of files to exclude
    exclude: [

    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
