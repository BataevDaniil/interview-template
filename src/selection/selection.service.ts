import { Injectable } from '@nestjs/common';
import { InjectDB } from '../db/db.decorator';
import { DB } from '../db/type';

export type CreateSelectionDto = {
  realEstates: string[];
};
@Injectable()
export class SelectionService {
  constructor(@InjectDB() private readonly db: DB) {}
  async create({ realEstates }: CreateSelectionDto) {
    const client = await this.db.pool.connect();

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
          [Number(realEstates[i]), id],
        );
      }

      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      await client.release();
    }
    return null;
  }
}
