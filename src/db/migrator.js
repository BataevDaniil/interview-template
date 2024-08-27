if (require.main === module) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Umzug } = require('umzug');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { query, pool } = require('./pg.js');

const migrationPath = 'src/db/migrations';
let umzug = new Umzug({
  migrations: { glob: `${migrationPath}/*.js` },
  context: { query },
  storage: {
    async executed({ context: { query: pgQuery } }) {
      await pgQuery(`create table if not exists migrations(name text)`);

      const { rows } = await pgQuery(`select name from migrations`);

      return rows.map(({ name }) => name);
    },
    async logMigration({ name, context: { query: pgQuery } }) {
      await pgQuery(`insert into migrations(name) values ($1)`, [name]);
    },
    async unlogMigration({ name, context: { query: pgQuery } }) {
      await pgQuery(`delete from migrations where name = $1`, [name]);
    },
  },
  logger: console,
  create: {
    folder: migrationPath,
  },
});

exports.umzug = umzug;

if (require.main === module) {
  umzug.runAsCLI().then(() => pool.end());
}
