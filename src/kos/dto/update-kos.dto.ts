import { IsOptional, IsString, IsInt, IsIn } from 'class-validator';

export class UpdateKosDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsInt()
  pricePerMonth?: number;

  @IsOptional()
  @IsIn(['male', 'female', 'mixed'])
  gender?: 'male' | 'female' | 'mixed';
}
