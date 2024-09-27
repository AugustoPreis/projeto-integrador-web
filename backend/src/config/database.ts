import { DataSourceOptions } from 'typeorm';

export function configDB(): DataSourceOptions {
  const { env } = process;

  const config = {
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    type: 'postgres',
    synchronize: false,
    logging: env.LOG_SQL === 'TRUE',
    entities: [`${__dirname}/models/**.{js,ts}`],
  };

  if (env.IS_DOCKER === 'TRUE') {
    config.host = 'postgres-db';
  }

  return config as DataSourceOptions;
}