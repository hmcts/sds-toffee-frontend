'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.config = void 0;
// better handling of unhandled exceptions
process.on('unhandledRejection', reason => {
  throw reason;
});
exports.config = {
  TEST_URL: process.env.TEST_URL || 'http://localhost:1337',
  TestHeadlessBrowser: process.env.TEST_HEADLESS ? process.env.TEST_HEADLESS === 'true' : true,
  TestSlowMo: 250,
  WaitForTimeout: 10000,
  Gherkin: {
    features: './features/**/*.feature',
    steps: ['../steps/common.ts'],
  },
  helpers: {},
};
exports.config.helpers = {
  Playwright: {
    url: exports.config.TEST_URL,
    show: !exports.config.TestHeadlessBrowser,
    browser: 'chromium',
    waitForTimeout: exports.config.WaitForTimeout,
    waitForAction: 1000,
    waitForNavigation: 'networkidle0',
    ignoreHTTPSErrors: true,
  },
};
