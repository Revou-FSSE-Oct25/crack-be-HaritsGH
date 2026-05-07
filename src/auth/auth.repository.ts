import { Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";

@Injectable()
export class AuthRepository{
  register(dto : CreateAuthDto) {}
  login() {}
  logout() {}
}