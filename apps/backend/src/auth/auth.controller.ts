import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async Login(@Body() reqPayload: LoginDto) {
    try {
      return this.authService.login(reqPayload);
    } catch (error) {}
  }

  @Post('/signup')
  async signup(@Body() reqPayload: SignupDto) {
    try {
      return this.authService.signup(reqPayload);
    } catch (error) {}
  }
}
