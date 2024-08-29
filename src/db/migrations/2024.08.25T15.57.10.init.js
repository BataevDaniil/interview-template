module.exports = {
  async up({ context: clientPg }) {
    await clientPg.query(`
     CREATE TABLE project (
       id serial,
       name varchar(255),
       primary key (id)
     );
     CREATE TABLE realestate(
       id serial,
       description varchar(255),
       project_id int references project(id) not null,
       primary key (id)
     );
     CREATE TABLE selection (
       id serial,
       primary key (id)
     );
     CREATE TABLE selection_realestate (
       id serial,
       realestate_id int references realestate(id) not null,
       selection_id int references selection(id) not null,
       status varchar(255),
       primary key (id)
     );
    `);
  },
  down({ context: clientPg }) {
    return clientPg.query(
      `DROP TABLE selection_realestate, selection, realestate, project;`,
    );
  },
};
