import { Controller, Post, Body } from '@nestjs/common';
import { CreateSelectionDto, SelectionService } from './selection.service';

@Controller('selection')
export class SelectionController {
  constructor(private readonly selectionService: SelectionService) {}

  @Post()
  create(@Body() createSelectionDto: CreateSelectionDto) {
    return this.selectionService.create(createSelectionDto);
  }
}
