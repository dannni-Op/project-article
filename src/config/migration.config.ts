import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({
  path: `${__dirname}/../../.env`,
});

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../entities/**/*.entity{.ts, .js}'],
  migrations: [__dirname + '/../../migrations/*{.ts, .js}'],
});
