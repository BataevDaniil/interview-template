import { Injectable } from '@nestjs/common';
import { InjectDB } from '../db/db.decorator';
import { DB } from '../db/type';

@Injectable()
export class ProjectService {
  constructor(@InjectDB() private readonly db: DB) {}
  async findBy(limit: number, offset: number) {
    const projects = (
      await this.db.query(
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
      await this.db.query<{ count: number }>(
        `SELECT count(project.id)::integer as "count" FROM project`,
      )
    ).rows;
    return { items: projects, total: count };
  }
}
