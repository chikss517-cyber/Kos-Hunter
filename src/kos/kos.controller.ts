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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.kosService.create(body);
  }

  @Get()
  findAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.kosService.findAll();
  }

  @Get('filter')
  filter(@Query('gender') gender: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.kosService.findByGender(gender);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.kosService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.kosService.delete(Number(id));
  }
}
