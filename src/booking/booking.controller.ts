import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  Res,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import express from 'express';
import { Response } from 'express';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // CREATE BOOKING
  @Post()
  create(@Body() data: any) {
    return this.bookingService.create(data);
  }

  // GET ALL BOOKING
  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  // GET BOOKING BY USER
  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.bookingService.findByUser(Number(id));
  }

  // UPDATE STATUS BOOKING
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.bookingService.updateStatus(Number(id), status);
  }

  // DELETE BOOKING
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(Number(id));
  }

  // HISTORY BOOKING BY MONTH
  @Get('history/month')
  historyMonth(@Query('month') month: string, @Query('year') year: string) {
    return this.bookingService.historyByMonth(Number(month), Number(year));
  }

  // GENERATE INVOICE PDF
  @Get(':id/invoice')
  invoice(@Param('id') id: string, @Res() res: express.Response) {
    return this.bookingService.generateInvoice(Number(id), res);
  }
}
