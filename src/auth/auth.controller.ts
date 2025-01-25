import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from './dtos/sign-up.dto';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}
    @Post('sign-up')
    signUp(@Body() signUpDto: SignUpDTO) {
        return this.authService.signUp(signUpDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDTO) {
        return this.authService.login(loginDto);
    }
}
