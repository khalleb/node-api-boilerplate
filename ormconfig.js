/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv/config');

const { env } = process.env.NODE_ENV !== 'development' ? require('./dist/shared/env') : require('./src/shared/env');

const baseConfigPostgres = {
  name: 'default',
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: Number(env.POSTGRES_PORT),
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASS,
  database: env.POSTGRES_DATABASE,
};

const baseConfigMongo = {
  name: 'mongo',
  type: 'mongodb',
  host: env.MONGO_HOST,
  port: Number(env.MONGO_PORT),
  database: env.MONGO_DATABASE,
  username: env.MONGO_USER,
  password: env.MONGO_PASS,
  useUnifiedTopology: true,
};

const developerConfig = [
  {
    ...baseConfigPostgres,
    logging: true,
    entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations',
    },
    seeds: ['./src/shared/infra/typeorm/seeds/*.ts'],
    factories: ['./src/shared/infra/typeorm/factories/*.ts'],
  },
];

const productionConfig = [
  {
    ...baseConfigPostgres,
    entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
    migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
    cli: {
      migrationsDir: './dist/shared/infra/typeorm/migrations',
    },
    seeds: ['./dist/shared/infra/typeorm/seeds/*.js'],
    factories: ['./dist/shared/infra/typeorm/factories/*.js'],
  },
];
if (baseConfigMongo.database && baseConfigMongo.username) {
  developerConfig.push({ ...baseConfigMongo, entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'] });
  productionConfig.push({ ...baseConfigMongo, entities: ['./dist/modules/**/infra/typeorm/schemas/*.js'] });
}

module.exports = env.isDevelopment ? developerConfig : productionConfig;
