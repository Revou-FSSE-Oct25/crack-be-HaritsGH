import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { AccessAuthDto } from './dto/access-auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService, 
    private authRepository: AuthRepository,
    private configService: ConfigService,
  ) {}

  async register(req : CreateAuthDto) {
    // Reject usernames containing 'deleted' to prevent conflicts with anonymized accounts
    if (req.username.includes('deleted')) {
      throw new ConflictException('Username cannot contain specific keywords');
    }

    // Check username uniqueness
    const existingUsername = await this.authRepository.findByUsername(req.username);
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // Check email uniqueness
    const existingEmail = await this.authRepository.findByEmail(req.email);
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }
    
    const hashedPassword = await bcrypt.hash(req.password, parseInt(process.env.BCRYPT_SALT_ROUNDS as string))
    
    const newUser = await this.authRepository.register({...req, password: hashedPassword})

    const payload = { username: newUser.username, userId: newUser.id }
    
    const accessToken = this.jwtService.sign({ ...payload, type: 'access' }, { expiresIn: (this.configService.get<string>('JWT_ACCESS_EXP')) as any });
    const refreshToken = this.jwtService.sign({ ...payload, type: 'refresh' }, { expiresIn: (this.configService.get<string>('JWT_REFRESH_EXP')) as any });

    await this.authRepository.storeTokens(newUser.username, accessToken, refreshToken)

    return {access_token: accessToken, refresh_token: refreshToken};
  }

  async login(credentials: AccessAuthDto) {
    // Reject usernames containing 'deleted' to prevent login attempts on anonymized accounts
    if (credentials.username.includes('deleted')) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.authRepository.login(credentials.username)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { username: user.username, userId: user.id }

    const accessToken = this.jwtService.sign({ ...payload, type: 'access' }, { expiresIn: (this.configService.get<string>('JWT_ACCESS_EXP')) as any });
    const refreshToken = this.jwtService.sign({ ...payload, type: 'refresh' }, { expiresIn: (this.configService.get<string>('JWT_REFRESH_EXP')) as any });

    await this.authRepository.storeTokens(user.username, accessToken, refreshToken)

    return {
      access_token: accessToken, refresh_token: refreshToken
    };
  }
  
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }

      const user = await this.authRepository.findByUsername(payload.username);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newPayload = { username: user.username, userId: user.id };
      
      const newAccessToken = this.jwtService.sign({ ...newPayload, type: 'access' }, { expiresIn: (this.configService.get<string>('JWT_ACCESS_EXP')) as any });
      const newRefreshToken = this.jwtService.sign({ ...newPayload, type: 'refresh' }, { expiresIn: (this.configService.get<string>('JWT_REFRESH_EXP')) as any });

      await this.authRepository.storeTokens(user.username, newAccessToken, newRefreshToken);

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(username: string) {
    await this.authRepository.clearTokens(username);
  }
}
