import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { KosService } from './kos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateKosDto } from './dto/create-kos.dto';
import { UpdateKosDto } from './dto/update-kos.dto';

@Controller('kos')
export class KosController {
  constructor(private readonly kosService: KosService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('owner')
  @Post()
  create(@Body() data: CreateKosDto) {
    return this.kosService.create(data);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('gender') gender?: string) {
    return this.kosService.findAll(gender);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kosService.findOne(Number(id));
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('owner')
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateKosDto) {
    return this.kosService.update(Number(id), data);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('owner')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kosService.remove(Number(id));
  }
}
