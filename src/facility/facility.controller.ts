import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FacilityService } from './facility.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@Controller('facilities')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('owner')
  @Post()
  create(@Body() data: CreateFacilityDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.facilityService.create(data);
  }
  @UseGuards(JwtAuthGuard)
  @Get('kos/:kosId')
  findByKos(@Param('kosId') kosId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.facilityService.findByKos(Number(kosId));
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('owner')
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateFacilityDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.facilityService.update(Number(id), data);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('owner')
  @Delete(':id')
  remove(@Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.facilityService.remove(Number(id));
  }
}
