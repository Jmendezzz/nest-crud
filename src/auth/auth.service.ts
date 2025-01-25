import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDTO } from './dtos/sign-up.dto';
import { LoginDTO } from './dtos/login.dto';
import { UsersService } from 'src/users/users.service';
import { AUTH_ERROR_MESSAGES } from './constants/auth.constants';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

    async signUp({ email, password, name }: SignUpDTO) {
        const existingUser = await this.usersService.findByEmail(email);

        if (existingUser) {
            throw new BadRequestException(AUTH_ERROR_MESSAGES.USER_ALREADY_EXISTS);
        }
        const hashedPassword = await this.hashPassword(password);

        const newUser = await this.usersService.create({ email, password: hashedPassword, name });

        const token = this.generateToken(newUser.email);

        return {
            token
        }
    }

    async login(loginDto: LoginDTO) {
        const user = await this.usersService.findByEmail(loginDto.email);

        if (!user) {
            throw new BadRequestException(AUTH_ERROR_MESSAGES.USER_NOT_FOUND);
        }

        const isPasswordValid = await this.comparePasswords(loginDto.password, user.password);

        if(!isPasswordValid) {
            throw new BadRequestException(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        const token = this.generateToken(user.email);
        return {
            token
        }
    }


    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    private async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    private generateToken(email: string) {
        return this.jwtService.sign({ email });
    }
}
