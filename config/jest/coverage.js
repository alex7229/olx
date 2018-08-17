const unitTestConfig = require('./unit');

module.exports = {
  ...unitTestConfig,
  "collectCoverageFrom": [
    "<rootDir>/src/application/**/*.ts"
  ]
};