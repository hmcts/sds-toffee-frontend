'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const healthcheck = require('@hmcts/nodejs-healthcheck');
function default_1(app) {
  const healthCheckConfig = {
    checks: {
      // TODO: replace this sample check with proper checks for your application
      sampleCheck: healthcheck.raw(() => healthcheck.up()),
    },
  };
  healthcheck.addTo(app, healthCheckConfig);
}
exports.default = default_1;
