'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Helmet = void 0;
const helmet_1 = __importDefault(require('helmet'));
const googleAnalyticsDomain = '*.google-analytics.com';
const self = "'self'";
/**
 * Module that enables helmet in the application
 */
class Helmet {
  constructor(developmentMode) {
    this.developmentMode = developmentMode;
  }
  enableFor(app) {
    // include default helmet functions
    const scriptSrc = [self, googleAnalyticsDomain, "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='"];
    if (this.developmentMode) {
      // Uncaught EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval'
      // is not an allowed source of script in the following Content Security Policy directive:
      // "script-src 'self' *.google-analytics.com 'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='".
      // seems to be related to webpack
      scriptSrc.push("'unsafe-eval'");
    }
    app.use(
      (0, helmet_1.default)({
        contentSecurityPolicy: {
          directives: {
            connectSrc: [self],
            defaultSrc: ["'none'"],
            fontSrc: [self, 'data:'],
            imgSrc: [self, googleAnalyticsDomain],
            objectSrc: [self],
            scriptSrc,
            styleSrc: [self],
          },
        },
        referrerPolicy: { policy: 'origin' },
      })
    );
  }
}
exports.Helmet = Helmet;
