import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AccessAuthDto } from './dto/access-auth.dto';
import { Public } from './decorators/public.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() req: CreateAuthDto) {
    const res = await this.authService.register(req)

    return {
      message: 'User registered successfully',
      accessToken: res.accessToken,
      refreshToken: res.refreshToken
    };
  }

  @Public()
  @Post('login')
  async login(@Body() credentials: AccessAuthDto) {
    const res = await this.authService.login(credentials);
    return {
      message: 'User logged in successfully',
      accessToken: res.access_token,
      refreshToken: res.refresh_token
    };
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    const result = await this.authService.refreshToken(req.user);
    return {
      message: 'Token refreshed successfully',
      accessToken: result.accessToken,
      refreshToken: result.refreshToken
    };
  }

  @Post('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user.username);
    return {
      message: 'User logged out successfully'
    };
  }

  @Get()
  async getUser(@Request() req) {
    return await req.user;
  }
}
