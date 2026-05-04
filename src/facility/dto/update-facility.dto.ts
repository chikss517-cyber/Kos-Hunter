import { IsString, IsOptional } from 'class-validator';

export class UpdateFacilityDto {
  @IsString()
  @IsOptional()
  facility?: string;
}
