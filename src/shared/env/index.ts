import 'dotenv/config';
import { cleanEnv, str, port, url, num } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], example: 'development', default: 'development' }),

  CORS_HOSTS: str({ example: 'http://localhost:3000;localhost:3000' }),

  APP_API_PORT: port({ example: '3333' }),
  APP_API_URL: url({ example: `http://localhost:3333` }),
  APP_WEB_URL: url({ example: `http://localhost:3334`, default: '' }),
  PAGE_SIZE: num({ example: `10`, default: 10 }),
  NAME_PROJECT: str({ example: `NAME_PROJECT` }),
  LOG_LEVEL: str({ choices: ['debug', 'info', 'warn', 'error', 'fatal'], example: 'debug', default: 'debug' }),
  DELIVERY_EMAIL: str({ example: `contact@mail.com.br` }),

  JWT_APP_SECRET: str({ example: 'ASD3SDA3242' }),
  JWT_APP_EXPIRES: str({ example: `15m`, default: `15m` }),
  JWT_APP_EXPIRES_REFRESH_TOKEN_DAYS: num({ example: `30`, default: 30 }),
  JWT_BLACK_LIST: str({ example: `NAME_PROJECT_JWT_BLACK_LIST` }),

  POSTGRES_HOST: str({ example: '127.0.0.1' }),
  POSTGRES_PORT: port({ example: '5432' }),
  POSTGRES_USER: str({ example: 'postgres' }),
  POSTGRES_PASS: str({ example: '123456' }),
  POSTGRES_DATABASE: str({ example: 'umbriel' }),

  MONGO_HOST: str({ example: '127.0.0.1', default: '' }),
  MONGO_PORT: port({ example: '27017', default: 27017 }),
  MONGO_DATABASE: str({ example: 'hermes', default: '' }),
  MONGO_USER: str({ example: '123456', default: '' }),
  MONGO_PASS: str({ example: 'hermes', default: '' }),

  REDIS_HOST: str({ example: '127.0.0.1' }),
  REDIS_PORT: port({ example: '6379' }),
  REDIS_PASS: str({ example: 'redis', default: '' }),
  REDIS_DB: num({ example: '1', default: 1 }),
  REDIS_ID: str({ example: 'UMBRIEL' }),

  STORAGE_MAX_SIZE_MEGABYTES: num({ example: '5', default: 5 }),

  MAIL_DRIVER: str({ choices: ['ethereal', 'ses'], default: 'ethereal' }),

  STORAGE_DRIVER: str({ choices: ['disk', 's3', 'digitalOcean'], default: 'disk' }),

  AWS_REGION: str({ default: '', example: 'us-east-1' }),
  AWS_ACCESS_KEY_ID: str({ default: '' }),
  AWS_SECRET_ACCESS_KEY: str({ default: '' }),
  AWS_BUCKET: str({ default: '' }),
  AWS_BUCKET_REGION: str({ default: '' }),
  AWS_BUCKET_URL: str({ default: '' }),
  AWS_PATH_IMAGE: str({ default: '' }),

  DIGITAL_OCEAN_BUCKET: str({ default: '' }),
  DIGITAL_OCEAN_ENDPOINT: str({ default: '' }),
  DIGITAL_OCEAN_ACCESS_KEY_ID: str({ default: '' }),
  DIGITAL_OCEAN_SECRET_ACCESS_KEY: str({ default: '' }),
  DIGITAL_OCEAN_PATH_IMAGE: str({ default: '' }),
});
export { env };
