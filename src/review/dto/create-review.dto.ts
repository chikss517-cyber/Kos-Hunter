import { IsInt, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  userId!: number;

  @IsInt()
  kosId!: number;

  @IsString()
  comment!: string;
}
