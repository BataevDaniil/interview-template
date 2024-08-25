import { Global, Module } from '@nestjs/common';
import { query } from './pg';
import { DB_MODULE_CONNECTION_TOKEN } from './db.constants';

const provider = {
  provide: DB_MODULE_CONNECTION_TOKEN,
  useValue: { query },
};
@Global()
@Module({
  exports: [provider],
  providers: [provider],
})
export class DBModule {}
