'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.app = void 0;
const path = __importStar(require('path'));
const appinsights_1 = require('./modules/appinsights');
const helmet_1 = require('./modules/helmet');
const nunjucks_1 = require('./modules/nunjucks');
const properties_volume_1 = require('./modules/properties-volume');
const bodyParser = __importStar(require('body-parser'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const express_1 = __importDefault(require('express'));
const glob_1 = require('glob');
const serve_favicon_1 = __importDefault(require('serve-favicon'));
const { setupDev } = require('./development');
const { Logger } = require('@hmcts/nodejs-logging');
const env = process.env.NODE_ENV || 'development';
const developmentMode = env === 'development';
exports.app = (0, express_1.default)();
exports.app.locals.ENV = env;
const logger = Logger.getLogger('app');
new properties_volume_1.PropertiesVolume().enableFor(exports.app);
new appinsights_1.AppInsights().enable();
new nunjucks_1.Nunjucks(developmentMode).enableFor(exports.app);
// secure the application by adding various HTTP headers to its responses
new helmet_1.Helmet(developmentMode).enableFor(exports.app);
exports.app.use((0, serve_favicon_1.default)(path.join(__dirname, '/public/assets/images/favicon.ico')));
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({ extended: false }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.static(path.join(__dirname, 'public')));
exports.app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  next();
});
glob_1.glob
  .sync(__dirname + '/routes/**/*.+(ts|js)')
  .map(filename => require(filename))
  .forEach(route => route.default(exports.app));
setupDev(exports.app, developmentMode);
// returning "not found" page for requests with paths not resolved by the router
exports.app.use((req, res) => {
  res.status(404);
  res.render('not-found');
});
// error handler
exports.app.use((err, req, res) => {
  logger.error(`${err.stack || err}`);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = env === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
