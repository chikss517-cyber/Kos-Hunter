import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { KosModule } from './kos/kos.module';
import { ReviewModule } from './review/review.module';
import { BookingModule } from './booking/booking.module';
import { FacilityModule } from './facility/facility.module';

@Module({
  imports: [AuthModule, KosModule, ReviewModule, BookingModule, FacilityModule],
})
export class AppModule {}
