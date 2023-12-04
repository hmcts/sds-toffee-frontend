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
exports.PropertiesVolume = void 0;
const propertiesVolume = __importStar(require('@hmcts/properties-volume'));
const config_1 = __importDefault(require('config'));
const lodash_1 = require('lodash');
class PropertiesVolume {
  enableFor(server) {
    if (server.locals.ENV !== 'development') {
      propertiesVolume.addTo(config_1.default);
      this.setSecret('secrets.sds-toffee.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
    }
  }
  setSecret(fromPath, toPath) {
    if (config_1.default.has(fromPath)) {
      (0, lodash_1.set)(config_1.default, toPath, (0, lodash_1.get)(config_1.default, fromPath));
    }
  }
}
exports.PropertiesVolume = PropertiesVolume;
