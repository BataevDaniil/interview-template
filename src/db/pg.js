// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Pool } = require('pg');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
  ),
});

const CREDENTIALS_DB = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_HOST),
  database: process.env.PG_DATABASE,
};

let pool = new Pool({
  ...CREDENTIALS_DB,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
exports.pool = pool;

let query = async (sql, values) => {
  return await pool.query(sql, values);
};
exports.query = query;
