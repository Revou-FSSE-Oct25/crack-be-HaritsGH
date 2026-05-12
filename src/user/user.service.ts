import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getProfile(username: string) {
    return await this.userRepository.getProfile(username);
  }

  async updateProfile(username: string, req: UpdateUserDto) {
    return await this.userRepository.updateProfile(username, req);
  }

  async changePassword(username: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_SALT_ROUNDS as string));
    return this.userRepository.changePassword(username, hashedPassword);
  }

  async deleteAccount(username: string) {
    // First get the user to find their ID
    const user = await this.userRepository.getProfile(username);

    if (!user) {
      throw new Error('User not found');
    }

    // Anonymize user data instead of deletion to preserve tournament history
    const anonUsername = `deleteduser${user.id}`;
    const anonEmail = `user${user.id}@deleted.com`;
    const anonHashedPassword = await bcrypt.hash(`user${user.id}deleted`, parseInt(process.env.BCRYPT_SALT_ROUNDS as string));

    return this.userRepository.deleteAccount(username, anonUsername, anonEmail, anonHashedPassword);
  }
}
