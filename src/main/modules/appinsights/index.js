'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppInsights = void 0;
const config_1 = __importDefault(require('config'));
const appInsights = require('applicationinsights');
class AppInsights {
  enable() {
    if (config_1.default.get('appInsights.instrumentationKey')) {
      appInsights.setup(config_1.default.get('appInsights.instrumentationKey')).setSendLiveMetrics(true).start();
      appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = 'sds-toffee-frontend';
      appInsights.defaultClient.trackTrace({
        message: 'App insights activated',
      });
    }
  }
}
exports.AppInsights = AppInsights;
