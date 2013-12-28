// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: 'app',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-local-storage/angular-local-storage.js',
      'bower_components/angular-snuownd/app/scripts/directives/snuownd.js',
      'bower_components/angular-previewer/app/scripts/directives/previewer.js',
      'bower_components/snuownd/snuownd.js',
      'bower_components/momentjs/moment.js',
      'bower_components/angular-moment/angular-moment.js',
      'scripts/*.js',
      'scripts/**/*.js',
      'vendors/scripts/**/*.js',
      'views/directives/*.html',
      '../test/mock/**/*.js',
      '../test/spec/**/*.js'
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'views/directives/*.html': 'html2js',
      'scripts/**/*.js': ['coverage']
    },

    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'coverage/' },
        { type: 'text' }
      ]
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
