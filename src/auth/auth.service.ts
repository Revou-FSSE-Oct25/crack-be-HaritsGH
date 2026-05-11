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
    const userExists = await this.authRepository.checkUserExists(req.username, req.email);
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    
    const hashedPassword = await bcrypt.hash(req.password, parseInt(process.env.BCRYPT_SALT_ROUNDS as string))
    
    const newUser = await this.authRepository.register({...req, password: hashedPassword})

    const payload = { sub: newUser.id, username: newUser.username, email: newUser.email }
    
    const accessToken = this.jwtService.sign(payload, { expiresIn: (this.configService.get<string>('JWT_ACCESS_EXP')) as any });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: (this.configService.get<string>('JWT_REFRESH_EXP')) as any });

    await this.authRepository.storeTokens(newUser.username, accessToken, refreshToken)

    return {access_token: accessToken, refresh_token: refreshToken};
  }

  async login(credentials: AccessAuthDto) {
    const user = await this.authRepository.login(credentials.username)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { username: user.username }

    const accessToken = this.jwtService.sign(payload, { expiresIn: (this.configService.get<string>('JWT_ACCESS_EXP')) as any });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: (this.configService.get<string>('JWT_REFRESH_EXP')) as any });

    await this.authRepository.storeTokens(user.username, accessToken, refreshToken)

    return {
      access_token: accessToken, refresh_token: refreshToken
    };
  }
  
  async logout(username: string) {
    await this.authRepository.clearTokens(username);
  }
}
