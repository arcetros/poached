/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./"
})

const jestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testEnvironment: "jest-environment-jsdom"
}

module.exports = createJestConfig(jestConfig)
