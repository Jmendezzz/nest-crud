import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { SignUpDTO } from './dtos/sign-up.dto';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';

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

    @Get('me')
    @UseGuards(AuthGuard)
    me(@Request() request) {
        return request.user;
    }
}
