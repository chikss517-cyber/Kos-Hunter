import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import express from 'express';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() data: any) {
    return this.bookingService.create(data);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.bookingService.updateStatus(Number(id), data.status);
  }

  @Get('history')
  history(@Query('month') month: string, @Query('year') year: string) {
    return this.bookingService.historyByMonth(Number(month), Number(year));
  }

  @Get(':id/invoice')
  generateInvoice(@Param('id') id: string, @Res() res: express.Response) {
    return this.bookingService.generateInvoice(Number(id), res);
  }
}
