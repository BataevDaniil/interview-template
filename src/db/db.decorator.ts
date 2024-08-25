import { Inject } from '@nestjs/common';
import { DB_MODULE_CONNECTION_TOKEN } from './db.constants';

export const InjectDB = () => Inject(DB_MODULE_CONNECTION_TOKEN);
