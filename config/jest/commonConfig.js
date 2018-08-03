module.exports = {
  "rootDir": '../../',
  "collectCoverageFrom": [
    "<rootDir>/src/**/*.{ts,tsx}"
  ],
  "testMatch": [
    "<rootDir>/src/__tests__/**/*.ts"
  ],
  "testEnvironment": "node",
  "transform": {
    "^.+\\.ts$": "<rootDir>/config/jest/typescriptTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$"
  ],
  "moduleFileExtensions": [
    "ts",
    "js"
  ],
  "globals": {
    "ts-jest": {
      "tsConfigFile": "tsconfig.json"
    }
  }
};