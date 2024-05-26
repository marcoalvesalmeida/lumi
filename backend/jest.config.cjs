module.exports = {
    clearMocks: true,
    collectCoverageFrom: ['src/services/**/*.ts'],
    testEnvironment: 'node',
    testMatch: ['<rootDir>/__tests__/**/*.spec.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};
