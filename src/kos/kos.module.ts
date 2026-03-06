import { Module } from '@nestjs/common';
import { KosService } from './kos.service';
import { KosController } from './kos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // tambahkan ini
  controllers: [KosController],
  providers: [KosService],
})
export class KosModule {}
