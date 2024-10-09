'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const axios_1 = __importDefault(require('axios'));
const chai_1 = require('chai');
const testUrl = process.env.TEST_URL || 'https://localhost:1337';
describe('Smoke Test', () => {
  describe('Home page loads', () => {
    test('with correct content', async () => {
      const response = await axios_1.default.get(testUrl, {
        headers: {
          'Accept-Encoding': 'gzip',
        },
      });
      (0, chai_1.expect)(response.data).includes('<h1 class="govuk-heading-xl">Recipes</h1>');
    });
  });
});
