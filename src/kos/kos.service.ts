import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KosService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(_arg0: number) {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(_arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return this.prisma.kos.create({ data });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(_gender: string | undefined) {
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
