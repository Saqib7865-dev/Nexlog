import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const ormconfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.NODE_ENV === 'development' ? true : false,
  entities: ['/dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
};

export default new DataSource(ormconfig);
