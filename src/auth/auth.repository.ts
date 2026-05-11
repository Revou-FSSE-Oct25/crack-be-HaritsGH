import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { PrismaService } from "src/prisma.service";
import * as bcrypt from 'bcrypt';
import { AccessAuthDto } from './dto/access-auth.dto';

@Injectable()
export class AuthRepository{
  constructor(private prisma: PrismaService) {}

  async register(req : CreateAuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: req.email
      }
    })
    if (existingUser) {
      throw new ConflictException('User already exists')
    }
    return this.prisma.user.create({
      data: {
        email: req.email,
        password: req.password,
        username: req.username,
      }
    })
  }

  async login(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true
      }
    });
  }

  async storeTokens(username: string, accessToken: string, refreshToken: string) {
    return this.prisma.user.update({
      where: { username },
      data: {
        accessToken,
        refreshToken,
      }
    });
  }

  async clearTokens(username: string) {
    return this.prisma.user.update({
      where: { username },
      data: {
        accessToken: null,
        refreshToken: null,
      }
    });
  }

  checkUserExists(username: string, email: string) {
    return this.prisma.user.findUnique({
      where: { username, email }
    });
  }
}
