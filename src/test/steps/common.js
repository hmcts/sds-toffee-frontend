'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.iAmOnPage = void 0;
const config_1 = require('../config');
const { I } = inject();
const iAmOnPage = text => {
  const url = new URL(text, config_1.config.TEST_URL);
  if (!url.searchParams.has('lng')) {
    url.searchParams.set('lng', 'en');
  }
  I.amOnPage(url.toString());
};
exports.iAmOnPage = iAmOnPage;
Given('I go to {string}', exports.iAmOnPage);
Then('the page URL should be {string}', url => {
  I.waitInUrl(url);
});
Then('the page should include {string}', text => {
  I.waitForText(text);
});
