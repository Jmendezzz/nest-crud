import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDTO {
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    password: string;

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    name: string;
}