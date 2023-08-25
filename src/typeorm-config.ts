import "reflect-metadata";
import { DataSource } from "typeorm";

const isDev = process.env.NODE_ENV === "development";

const dataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [],
  synchronize: false,
  logging: isDev,
  migrationsRun: true,
  migrations: [],
});

export default dataSource;
