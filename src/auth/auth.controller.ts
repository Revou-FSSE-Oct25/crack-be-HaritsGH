import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AccessAuthDto } from './dto/access-auth.dto';
import { access } from 'fs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() req: CreateAuthDto) {
    const res = await this.authService.register(req)

    return {
      message: 'User registered successfully',
      access_token: res.access_token,
      refresh_token: res.refresh_token
    };
  }

  @Post('login')
  async login(@Body() credentials: AccessAuthDto) {
    const res = await this.authService.login(credentials);
    return {
      message: 'User logged in successfully',
      access_token: res.access_token,
      refresh_token: res.refresh_token
    };
  }

  @Post('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user.sub);
    return {
      message: 'User logged out successfully'
    };
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
