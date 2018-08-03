const commonConfig = require('./commonConfig');

module.exports = {

  ...commonConfig,

  "testMatch": [
    "<rootDir>/src/__tests__/integration/**/*.ts"
  ]
};