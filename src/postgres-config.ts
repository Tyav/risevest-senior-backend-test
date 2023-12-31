import { Pool, Client } from 'pg'
 
const pool = new Pool({
  host: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})
 
export default pool;