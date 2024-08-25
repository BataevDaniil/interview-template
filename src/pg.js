// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Client } = require('pg');

let query = async (sql, values) => {
  const client = new Client({
    user: 'interview',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'interview',
  });

  await client.connect();
  try {
    return await client.query(sql, values);
  } finally {
    await client.end();
  }
};
exports.query = query;
