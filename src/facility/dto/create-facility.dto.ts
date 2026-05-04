import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateFacilityDto {
  @IsInt()
  kosId: number;

  @IsString()
  @IsNotEmpty()
  facility: string;
}
