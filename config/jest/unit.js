const commonConfig = require('./commonConfig');

module.exports = {

  ...commonConfig,

  "testPathIgnorePatterns": [
    "<rootDir>/src/__tests__/integration"
  ]
};