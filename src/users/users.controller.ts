import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/constants';
import { EditUserDto } from './dto/edit-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  getUsers() {
    return this.usersService.getAll();
  }

  @Public()
  @Patch()
  editUser(@Body() user: EditUserDto) {
    return this.usersService.edit(user);
  }

  @Public()
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
