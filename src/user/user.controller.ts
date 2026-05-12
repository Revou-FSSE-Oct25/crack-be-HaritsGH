import { Controller, Get, Patch, Delete, Request, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getProfile(@Request() req) {
    // For fetching current user's profile using JWT
    return {
      message: 'User profile retrieved successfully',
      data: await this.userService.getProfile(req.user.username),
    };
  }

  @Patch()
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    // For updating user profile using token username
    return {
      message: 'User updated successfully',
      data: await this.userService.updateProfile(req.user.username, updateUserDto),
    };
  }

  @Patch('edit')
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    // For changing user password using token username
    return {
      message: 'Password changed successfully',
      data: await this.userService.changePassword(req.user.username, changePasswordDto.password),
    };
  }

  @Delete()
  async deleteAccount(@Request() req) {
    // For deleting user account using token username
    return {
      message: 'User deleted successfully',
      data: await this.userService.deleteAccount(req.user.username),
    };
  }
}
