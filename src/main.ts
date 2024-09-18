import fastify from 'fastify';
import { db } from './db';

const server = fastify({
  logger: true,
});

server.get<{ Querystring: { limit: number; offset: number } }>(
  '/project',
  {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          limit: { type: 'integer' },
          offset: { type: 'integer' },
        },
      },
    },
  },
  async (request) => {
    const { limit, offset } = request.query;
    const projects = (
      await db.query(
        `
       SELECT project.*, count(realestate.id)::integer as "realEstateCount" FROM project 
         left join realestate on realestate.project_id = realestate.id 
         group by project.id
         limit $1
         offset $2
        `,
        [limit, offset],
      )
    ).rows;
    const [{ count }] = (
      await db.query<{ count: number }>(
        `SELECT count(project.id)::integer as "count" FROM project`,
      )
    ).rows;
    return { items: projects, total: count };
  },
);

server.post<{ Body: { realEstates: number[] } }>(
  '/selection',
  {
    schema: {
      body: {
        type: 'object',
        properties: {
          realEstates: {
            type: 'array',
            maxItems: 20,
            items: { type: 'integer' },
          },
        },
      },
    },
  },
  async (request) => {
    const { realEstates } = request.body;
    const client = await db.pool.connect();
    try {
      await client.query('BEGIN');
      const {
        rows: [{ id }],
      } = await client.query<{ id: string }>(
        'INSERT INTO selection DEFAULT VALUES RETURNING id',
      );
      for (let i = 0; i < realEstates.length; i++) {
        await client.query(
          'INSERT INTO selection_realestate(realestate_id, selection_id) VALUES ($1, $2);',
          [realEstates[i], id],
        );
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      await client.release();
    }
  },
);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
