module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testURL:'http://0.0.0.0:8989',
    coverageDirectory: "./coverage/",
    collectCoverage: true,
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    globals: {
        "ts-jest": {
            tsconfig: "__tests__/tsconfig.json",
        },
    },
};
