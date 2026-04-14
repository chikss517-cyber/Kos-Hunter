import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

@Injectable()
export class BookingService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  historyByMonth(_arg0: number, arg1: number) {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(_arg0: number) {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateStatus(_arg0: number, status: string) {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByUser(_arg0: number) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

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

  async generateInvoice(id: number, res: Response) {
    const booking = await this.prisma.book.findUnique({
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
    doc.text(`Mulai : ${booking.startDate}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
    doc.text(`Selesai : ${booking.endDate}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    doc.text(`Status : ${booking.status}`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    doc.end();
  }
}
