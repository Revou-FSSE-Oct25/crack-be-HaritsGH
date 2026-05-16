import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  
  async getProfile(username: string) {
    return await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        profileImageURL: true,
      },
    });
  }
  
  async updateProfile(username: string, req: any) {
    return await this.prisma.user.update({
      where: { username },
      data: {
        email: req.email,
        profileImageURL: req.profileImageURL,
      },
      select: {
        id: true,
        username: true,
        email: true,
        profileImageURL: true,
      },
    });
  }
  
  async changePassword(username: string, hashedPassword: string) {
    return await this.prisma.user.update({
      where: { username },
      data: {
        password: hashedPassword,
      },
      select: {
        username: true,
      },
    });
  }

  async deleteAccount(username: string, anonUsername: string, anonEmail: string, anonHashedPassword: string) {
    return await this.prisma.user.update({
      where: { username },
      data: {
        username: anonUsername,
        email: anonEmail,
        password: anonHashedPassword, // Set hashed password for deleted user
        profileImageURL: null, // Remove profile image
        accessToken: null, // Clear tokens
        refreshToken: null, // Clear tokens
      },
      select: {
        id: true,
        username: true,
        email: true,
        profileImageURL: true,
        createdAt: true,
      },
    });
  }

  async searchUsers(username: string) {
    return await this.prisma.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
      select: {
        id: true,
        username: true,
      },
      take: 10,
    });
  }

  async getUserById(userIds: number[]) {
    return await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        username: true,
      },
    });
  }
}
