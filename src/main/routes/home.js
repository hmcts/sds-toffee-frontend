'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const config_1 = __importDefault(require('config'));
const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('home.ts');
const recipesUrl = config_1.default.get('backendUrl');
function default_1(app) {
  app.get('/', async (req, res) => {
    const url = `${recipesUrl}/recipes`;
    try {
      const { recipes } = await fetch(url).then(fetchRes => fetchRes.json());
      return res.render('home', { recipes });
    } catch (err) {
      logger.error(err.stack);
      return res.status(500).render('error', { message: 'Problem communicating with the backend' });
    }
  });
}
exports.default = default_1;
