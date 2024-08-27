module.exports = {
  async up({ context: clientPg }) {
    await clientPg.query(`
     CREATE TABLE agent (
       id int,
       LastName varchar(255),
       FirstName varchar(255),
       Address varchar(255),
       City varchar(255)
     );
    `);
  },
  down({ context: clientPg }) {
    return clientPg.query(`DROP TABLE agent`);
  },
};
