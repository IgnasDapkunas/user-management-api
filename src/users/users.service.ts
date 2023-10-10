import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { BaseUserDto, UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async get(email: string): Promise<UserDto> {
    const user = this.userModel.findOne({ email }).exec();

    return user;
  }

  async getAll(): Promise<BaseUserDto[]> {
    const users = await this.userModel.find().exec();
    const result = users.map((user) => {
      const { password: _password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

    return result;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser;
  }

  async edit(user: EditUserDto) {
    const foundUser = await this.userModel.findById({ _id: user.id }).exec();

    if (!foundUser) {
      throw new NotFoundException(`User with id ${user.id} not found`);
    }

    if (user.password) {
      foundUser.password = await bcrypt.hash(user.password, 10);
    }

    const { id: _id, password: _password, ...parsedUser } = user;

    Object.assign(foundUser, parsedUser);

    return await foundUser.save();
  }

  async remove(id: string) {
    await this.userModel.deleteOne({ _id: id }).exec();

    return { message: 'Deleting user' };
  }
}
