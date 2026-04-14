import { BookStatus } from '@prisma/client';
import { IsInt, IsDateString, IsEnum } from 'class-validator';
export class CreateBookingDto {
  @IsInt()
  userId!: number;

  @IsInt()
  kosId!: number;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsEnum(BookStatus)
  status!: BookStatus;
}
