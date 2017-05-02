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
        './dist/lib/jquery.min.js',
        './dist/lib/jquery-ui.min.js',
        './dist/lib/angular.min.js',
        './dist/lib/angular-ui-router.min.js',
        './dist/lib/angular-messages.min.js',
        './dist/lib/angular-cookies.min.js',
        './dist/lib/angular-animate.min.js',
        './dist/lib/moment.min.js',
        './bower_components/lodash/dist/lodash.min.js',
        './dist/lib/moment-timezone-with-data.min.js',
        './dist/lib/sortable.min.js',
        './dist/lib/ui-bootstrap.min.js',
        './dist/lib/ui-bootstrap-tpls.min.js',
        './dist/lib/datetimepicker.js',
        './dist/lib/dateTimeInput.js',
        './dist/lib/angularjs-dropdown-multiselect.js',
        './dist/lib/bootstrap.min.js',
        './dist/lib/bowser.js',
        './dist/lib/dirPagination.js',
        './bower_components/angular-mocks/angular-mocks.js',
        './bower_components/ng-table/dist/ng-table.min.js',
        './bower_components/angular-tooltips/dist/angular-tooltips.min.js',
        './dist/js/ngConstants.js',
        './dist/js/templates.js',
        './dist/js/**/*.module.js',
        './dist/js/**/*.js',
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
