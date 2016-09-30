module.exports = function (config) {

  var configuration = {
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],
    files: [{pattern: './spec-bundle.js', watched: false}],

    /*
     * preprocess matching files before serving them to the browser
     */
    preprocessors: {'./spec-bundle.js': ['coverage', 'webpack', 'sourcemap']},
    webpack: require('../webpack.config.js'), // Bundle code to test
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'json'},
        {type: 'html'}
      ]
    },
    // Webpack please don't spam the console when running in karma
    webpackServer: {noInfo: true},
    // test results reporter to use, possible values: 'dots', 'progress'
    reporters: ['mocha', 'coverage'],
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /*
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    /*
     * start these browsers
     */
    browsers: [
      'Chrome'
    ],

    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['ChromeTravisCi'];
  }

  config.set(configuration);
};
