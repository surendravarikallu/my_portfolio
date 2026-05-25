# Testing Documentation — My Portfolio

This document outlines the testing architecture, configurations, and test execution procedures for the Developer Portfolio application.

---

## 1. Testing Framework

The portfolio application uses **Jest** with **ts-jest** to test utility functions, UI helpers, and component interactions in a mock browser DOM environment.

- **Test Runner**: Jest
- **Environment**: `jest-environment-jsdom`
- **TypeScript Preprocessor**: `ts-jest`
- **Coverage Tool**: Jest built-in code coverage reporter.

---

## 2. Test Execution

Use the following commands to run the test suite:

### Installation
Ensure development dependencies are installed:
```bash
npm install
```

### Run Tests
```bash
npm run test
```

### Run Coverage Analysis
```bash
npm run test:coverage
```
An interactive HTML coverage report will be generated inside the `coverage/` directory.
