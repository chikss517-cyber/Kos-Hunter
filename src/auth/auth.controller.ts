import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.authService.login(data);
  }
}
