import * as dotenv from 'dotenv';
import appConfig from './common/utils/appConfig';

dotenv.config();

const config = appConfig({
  env: {
    default: 'local',
    env: 'NODE_ENV',
    allowed: ['local', 'dev', 'prod'],
  },
  serverPort: {
    default: 3000,
    env: 'PORT',
  },
  logLevel: {
    default: 'info',
    env: 'LOG_LEVEL',
    allowed: ['error', 'warn', 'info', 'debug'],
  },
  logRequests: {
    default: false,
    env: 'LOG_REQUESTS',
  },
  db: {
    password: {
      default: 'thisIsAnExample',
      env: 'DB_PASSWORD',
    },
  },
});

export default config;
