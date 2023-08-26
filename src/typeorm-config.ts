import "reflect-metadata";
import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { CreateUsersTables1693009997173 } from "./migrations/1693009997173-CreateUsersTables";

const isDev = process.env.NODE_ENV === "development";

const dataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [ User ],
  synchronize: false,
  logging: isDev,
  migrationsRun: true,
  migrations: [ CreateUsersTables1693009997173 ],
});

export default dataSource;
