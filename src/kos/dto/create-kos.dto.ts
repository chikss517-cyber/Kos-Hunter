export class CreateKosDto {
  userId: number;
  name: string;
  address: string;
  pricePerMonth: number;
  gender: 'male' | 'female' | 'all';
}
