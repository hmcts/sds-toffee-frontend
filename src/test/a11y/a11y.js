'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create((typeof Iterator === 'function' ? Iterator : Object).prototype);
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
var app_1 = require('../../main/app');
var supertest = require('supertest');
var pa11y = require('pa11y');
var agent = supertest.agent(app_1.app);
var Pa11yResult = /** @class */ (function () {
  function Pa11yResult(documentTitle, pageUrl, issues) {
    this.documentTitle = documentTitle;
    this.pageUrl = pageUrl;
    this.issues = issues;
  }
  return Pa11yResult;
})();
var PallyIssue = /** @class */ (function () {
  function PallyIssue(code, context, message, selector, type, typeCode) {
    this.code = code;
    this.context = context;
    this.message = message;
    this.selector = selector;
    this.type = type;
    this.typeCode = typeCode;
  }
  return PallyIssue;
})();
function ensurePageCallWillSucceed(url) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        agent.get(url).then(function (res) {
          if (res.redirect) {
            throw new Error('Call to '.concat(url, ' resulted in a redirect to ').concat(res.get('Location')));
          }
          if (res.serverError) {
            throw new Error('Call to '.concat(url, ' resulted in internal server error'));
          }
        }),
      ];
    });
  });
}
function runPally(url) {
  return pa11y(url, {
    hideElements: '.govuk-footer__licence-logo, .govuk-header__logotype-crown',
  });
}
function expectNoErrors(messages) {
  var errors = messages.filter(function (m) {
    return m.type === 'error';
  });
  if (errors.length > 0) {
    var errorsAsJson = ''.concat(JSON.stringify(errors, null, 2));
    throw new Error('There are accessibility issues: \n'.concat(errorsAsJson, '\n'));
  }
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(function () {
  return Promise.resolve({
    json: function () {
      return Promise.resolve({ recipes: [] });
    },
  });
});
function testAccessibility(url) {
  var _this = this;
  describe('Page '.concat(url), function () {
    test('should have no accessibility errors', function () {
      return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, ensurePageCallWillSucceed(url)];
            case 1:
              _a.sent();
              return [4 /*yield*/, runPally(agent.get(url).url)];
            case 2:
              result = _a.sent();
              expect(result.issues).toEqual(expect.any(Array));
              expectNoErrors(result.issues);
              return [2 /*return*/];
          }
        });
      });
    });
  });
}
jest.setTimeout(30000);
describe('Accessibility', function () {
  // testing accessibility of the home page
  testAccessibility('/');
  // TODO: include each path of your application in accessibility checks
});
