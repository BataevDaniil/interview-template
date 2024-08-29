import { Global, Module } from '@nestjs/common';
import { query, pool } from './pg';
import { DB_MODULE_CONNECTION_TOKEN } from './db.constants';

const provider = {
  provide: DB_MODULE_CONNECTION_TOKEN,
  useValue: { query, pool },
};
@Global()
@Module({
  exports: [provider],
  providers: [provider],
})
export class DBModule {}
