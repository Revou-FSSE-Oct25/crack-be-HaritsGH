import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // For creating user account from Admin dashboard
    return {
      message: 'User created successfully',
      data: this.userService.create(createUserDto),
    };
  }

  @Get()
  findAll(@Param('page') page?: number) {
    // For Admin dashboard
    return {
      message: 'Users retrieved successfully',
      data: this.userService.findAll(page),
    };
  }

  @Get('profile')
  getProfile(@Request() req) {
    // For fetching current user's profile using JWT
    return {
      message: 'User profile retrieved successfully',
      data: {
        id: req.user.sub,
        username: req.user.username
      }
    };
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    // For fetching user profile
    return {
      message: 'User retrieved successfully',
      data: this.userService.findOne(username),
    };
  }

  @Patch(':username')
  update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    // For updating user profile
    return {
      message: 'User updated successfully',
      data: this.userService.update(username, updateUserDto),
    };
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    // For deleting user account
    return {
      message: 'User deleted successfully',
      data: this.userService.remove(username),
    };
  }
}
