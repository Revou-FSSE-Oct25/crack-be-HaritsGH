import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(req: CreateUserDto) {
    return this.userRepository.create(req);
  }

  findAll(pagination: number = 1) {
    return this.userRepository.findAll(pagination);
  }

  findOne(username: string) {
    return this.userRepository.findOne(username);
  }

  update(username: string, req: UpdateUserDto) {
    return this.userRepository.update(username, req);
  }

  remove(username: string) {
    return this.userRepository.remove(username);
  }
}
