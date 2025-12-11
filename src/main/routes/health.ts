import axios from 'axios';
import config from 'config';
import { Application } from 'express';

const healthcheck = require('@hmcts/nodejs-healthcheck');
const recipesUrl = config.get('backendUrl');
export default function (app: Application): void {
  const healthCheckConfig = {
    checks: {
      backendCheck: healthcheck.raw(async () => {
        try {
          const response = await axios.get(`${recipesUrl}/health/readiness`);
          if (response.status === 200) {
            return healthcheck.up({ message: 'Backend is UP' });
          } else {
            return healthcheck.down({ message: 'Backend is DOWN' });
          }
        } catch {
          return healthcheck.down({ statusCode: 500, message: 'Backend is DOWN' });
        }
      }),
    },
  };
  healthcheck.addTo(app, healthCheckConfig);
}
