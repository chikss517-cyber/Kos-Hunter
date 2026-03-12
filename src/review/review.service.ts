import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return this.prisma.review.create({ data });
  }

  getKosReviews(kosId: number) {
    return this.prisma.review.findMany({
      where: { kosId },
    });
  }

  reply(id: number, replyText: string) {
    return this.prisma.review.update({
      where: { id },
      data: { reply: replyText },
    });
  }
}
