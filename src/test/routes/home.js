'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const app_1 = require('../../main/app');
const chai_1 = require('chai');
const supertest_1 = __importDefault(require('supertest'));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ recipes: [] }),
  })
);
describe('Home page', () => {
  describe('on GET', () => {
    test('should return sample home page', async () => {
      await (0, supertest_1.default)(app_1.app)
        .get('/')
        .expect(res => (0, chai_1.expect)(res.status).to.equal(200));
    });
  });
});
