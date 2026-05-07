import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UserRepository {
  private userList: User[] = [];
  
  create(req: CreateUserDto) {
    const user: User = {
      id: this.userList.length === 0 ? 1 : this.userList[-1].id + 1,
      username: req.username,
      email: req.email,
      password: req.password,
    };
    this.userList.push(user);
    return user;
  }

  findAll(pagination: number = 1) {
    const limit = 10;
    const startIndex = (pagination - 1) * limit;
    const endIndex = startIndex + limit;
    return this.userList.slice(startIndex, endIndex);
  }
  
  findOne(username: string) {
    return this.userList.find((user) => user.username === username);
  }
  
  update(username: string, req: any) {
    const user = this.userList.find((user) => user.username === username);
    if (user) {
      user.email = req.email;
      user.password = req.password;
    }
    return 'This action updates a user';
  }
  
  remove(username: string) {
    const user = this.userList.find((user) => user.username === username);
    if (user) {
      this.userList.splice(this.userList.indexOf(user), 1);
    }
    return 'This action removes a user';
  }
}
