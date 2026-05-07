import pkg from 'pg'
const { Pool } = pkg
import { DATABASE_URL, DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD, DB_PORT } from './config.js'

export const pool = new Pool(
  DATABASE_URL
    ? { connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } }
    : { host: DB_HOST, user: DB_USER, password: DB_PASSWORD, port: DB_PORT, database: DB_DATABASE }
)
