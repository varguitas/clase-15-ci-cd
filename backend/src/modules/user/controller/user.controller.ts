import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/IUser';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() user: IUser) {
    return this.userService.create(user);
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.findById(id);
  }
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: any) {
    return this.userService.update(id, user);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
