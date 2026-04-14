import { IsString, IsInt, IsIn } from 'class-validator';

export class CreateKosDto {
  @IsString()
  name!: string;

  @IsString()
  address!: string;

  @IsInt()
  pricePerMonth!: number;

  @IsIn(['male', 'female', 'mixed'])
  gender!: 'male' | 'female' | 'mixed';

  @IsInt()
  userId!: number;
}
