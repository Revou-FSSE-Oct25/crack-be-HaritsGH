import { IsString } from "class-validator";

export class AccessAuthDto {
  @IsString()
  username: string;
  
  @IsString()
  password: string;
}
