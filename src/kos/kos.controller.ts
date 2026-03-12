import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { KosService } from './kos.service';

@Controller('kos')
export class KosController {
  constructor(private kosService: KosService) {}

  @Post()
  create(@Body() body: any) {
    return this.kosService.create(body);
  }

  @Get()
  findAll() {
    return this.kosService.findAll();
  }

  @Get('filter')
  filter(@Query('gender') gender: string) {
    return this.kosService.findByGender(gender);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.kosService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.kosService.delete(Number(id));
  }
}
