import { Module } from '@nestjs/common';
import { DBModule } from './db/db.module';
import { ProjectModule } from './project/project.module';
import { SelectionModule } from './selection/selection.module';

@Module({
  imports: [DBModule, ProjectModule, SelectionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
