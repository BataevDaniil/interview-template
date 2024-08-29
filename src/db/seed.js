if (require.main === module) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { query, pool } = require('./pg.js');

(async () => {
  try {
    await query(`
        INSERT INTO project(name) VALUES ('1 project');
        INSERT INTO project(name) VALUES ('2 project');
        INSERT INTO project(name) VALUES ('3 project');
        INSERT INTO project(name) VALUES ('4 project');

        INSERT INTO realestate(description, project_id) VALUES ('1 cool real estate in project 1', 1);
        INSERT INTO realestate(description, project_id) VALUES ('2 cool real estate in project 1', 1);
        INSERT INTO realestate(description, project_id) VALUES ('3 cool real estate in project 1', 1);

        INSERT INTO realestate(description, project_id) VALUES ('1 cool real estate in project 2', 2);
        INSERT INTO realestate(description, project_id) VALUES ('2 cool real estate in project 2', 2);
    `);
  } finally {
    await pool.end();
  }
})();
