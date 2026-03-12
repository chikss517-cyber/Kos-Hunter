import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

@Injectable()
export class BookingService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByUser(_arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  // CREATE BOOKING
  async create(data: any) {
    return this.prisma.book.create({
      data: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        kosId: data.kosId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        userId: data.userId,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        startDate: new Date(data.startDate),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        endDate: new Date(data.endDate),
        status: 'pending',
      },
    });
  }

  // GET ALL BOOKING
  async findAll() {
    return this.prisma.book.findMany({
      include: {
        user: true,
        kos: true,
      },
    });
  }

  // UPDATE STATUS BOOKING
  async updateStatus(id: number, status: string) {
    return this.prisma.book.update({
      where: { id },
      data: { status: status as any },
    });
  }

  // DELETE BOOKING
  async remove(id: number) {
    return this.prisma.book.delete({
      where: { id },
    });
  }

  // HISTORY BOOKING BY MONTH
  async historyByMonth(month: number, year: number) {
    return this.prisma.book.findMany({
      where: {
        startDate: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${year}-${month + 1}-01`),
        },
      },
      include: {
        user: true,
        kos: true,
      },
    });
  }

  // GENERATE PDF INVOICE
  async generateInvoice(id: number, res: Response) {
    const booking = await this.prisma.book.findUnique({
      where: { id },
      include: { user: true, kos: true },
    });

    if (!booking) {
      res.status(404).send('Booking not found');
      return;
    }

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(20).text('NOTA BOOKING KOS', { align: 'center' });

    doc.moveDown();

    doc.text(`Nama Penyewa : ${booking.user.name}`);
    doc.text(`Kos : ${booking.kos.name}`);
    doc.text(`Alamat : ${booking.kos.address}`);
    doc.text(`Mulai : ${booking.startDate.toISOString()}`);
    doc.text(`Selesai : ${booking.endDate.toISOString()}`);
    doc.text(`Status : ${booking.status}`);

    doc.end();
  }
}