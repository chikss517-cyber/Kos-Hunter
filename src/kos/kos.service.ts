import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KosService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return this.prisma.kos.create({ data });
  }

  findAll() {
    return this.prisma.kos.findMany({
      include: {
        images: true,
        facilities: true,
      },
    });
  }

  findByGender(gender: any) {
    return this.prisma.kos.findMany({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where: { gender: gender },
    });
  }

  update(id: number, data: any) {
    return this.prisma.kos.update({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data,
    });
  }

  delete(id: number) {
    return this.prisma.kos.delete({
      where: { id },
    });
  }
}
