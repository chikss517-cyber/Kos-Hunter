import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module'; // ⬅️ TAMBAHKAN INI

@Module({
  imports: [
    PrismaModule,
    AuthModule, // ⬅️ supaya bisa pakai JwtAuthGuard & RolesGuard
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
