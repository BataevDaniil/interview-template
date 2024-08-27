if (require.main === module) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { query, pool } = require('./pg.js');

(async () => {
  try {
    await query(`INSERT INTO agent("lastname") VALUES ('Daniil');`);
  } finally {
    await pool.end();
  }
})();
