import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Query,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import express from 'express';

// 🔐 auth
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

import { BookStatus } from '@prisma/client';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // ✅ SOCIETY CREATE BOOKING
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.bookingService.create(req.user.id, data);
  }

  // ✅ LIHAT SEMUA (optional: batasi nanti)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.bookingService.findAll();
  }

  // ✅ OWNER APPROVE / REJECT
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('owner')
  @Put(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Req() req,
    @Body('status') status: BookStatus,
  ) {
    return this.bookingService.updateStatus(
      Number(id),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      req.user.id, // 🔥 ambil dari token
      status,
    );
  }

  // ✅ HISTORY
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('owner')
  @Get('history')
  history(@Query('month') month: string, @Query('year') year: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.bookingService.historyByMonth(Number(month), Number(year));
  }

  // ✅ INVOICE PDF
  @UseGuards(JwtAuthGuard)
  @Get(':id/invoice')
  generateInvoice(@Param('id') id: string, @Res() res: express.Response) {
    return this.bookingService.generateInvoice(Number(id), res);
  }
}
