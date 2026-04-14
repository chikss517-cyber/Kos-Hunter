import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { KosService } from './kos.service';

@Controller('kos')
export class KosController {
  constructor(private readonly kosService: KosService) {}

  @Post()
  create(@Body() data: any) {
    return this.kosService.create(data);
  }

  @Get()
  findAll(@Query('gender') gender?: string) {
    return this.kosService.findAll(gender);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kosService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.kosService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kosService.remove(Number(id));
  }
}
