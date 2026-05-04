import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookStatus } from '@prisma/client';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREATE BOOKING (society)
  create(userId: number, data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.prisma.booking.create({
      data: {
        userId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        kosId: data.kosId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        startDate: new Date(data.startDate),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        endDate: new Date(data.endDate),
        status: BookStatus.pending,
      },
    });
  }

  // ✅ OWNER APPROVE / REJECT
  async updateStatus(bookingId: number, ownerId: number, status: BookStatus) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { kos: true },
    });

    if (!booking) throw new NotFoundException('Booking tidak ditemukan');

    // 🔐 VALIDASI OWNER
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (booking.kos.userId !== ownerId) {
      throw new ForbiddenException('Bukan kos milik anda');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });
  }

  // ✅ LIST SEMUA BOOKING (admin/owner)
  findAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.prisma.booking.findMany({
      include: { user: true, kos: true },
    });
  }

  // ✅ BOOKING MILIK USER
  findByUser(userId: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.prisma.booking.findMany({
      where: { userId },
      include: { kos: true },
    });
  }

  // ✅ HISTORY FILTER BULAN & TAHUN
  historyByMonth(month: number, year: number) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.prisma.booking.findMany({
      where: {
        startDate: {
          gte: start,
          lte: end,
        },
      },
      include: { user: true, kos: true },
    });
  }

  // ✅ DELETE BOOKING
  remove(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.prisma.booking.delete({
      where: { id },
    });
  }

  // ✅ GENERATE PDF INVOICE
  async generateInvoice(id: number, res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { user: true, kos: true },
    });

    if (!booking) {
      res.status(404).send('Booking not found');
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    doc.pipe(res);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    doc.fontSize(20).text('NOTA BOOKING KOS', { align: 'center' });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    doc.moveDown();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    doc.text(`Nama Penyewa : ${booking.user.name}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    doc.text(`Kos : ${booking.kos.name}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    doc.text(`Alamat : ${booking.kos.address}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    doc.text(`Mulai : ${booking.startDate.toDateString()}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    doc.text(`Selesai : ${booking.endDate.toDateString()}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    doc.text(`Status : ${booking.status}`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    doc.end();
  }
}
