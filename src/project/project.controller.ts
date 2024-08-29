import { Controller, Get, Query } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findBy(@Query() page: { limit: string; offset: string }) {
    return this.projectService.findBy(Number(page.limit), Number(page.offset));
  }
}
