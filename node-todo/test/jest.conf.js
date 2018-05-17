const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  moduleFileExtensions: [
    'js'
  ],
  testRegex: '.*\.spec\.js$',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules'
  ],
  coverageDirectory: '<rootDir>/test/coverage',
  collectCoverageFrom: [
    'src/**/*.js'
  ]
};
