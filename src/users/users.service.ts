import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private readonly userModel) {}

    async create(user: CreateUserDTO): Promise<User> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email }).exec();
    }

}
