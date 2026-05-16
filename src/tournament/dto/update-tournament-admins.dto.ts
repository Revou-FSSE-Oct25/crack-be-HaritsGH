import { IsArray, IsNumber, IsString } from "class-validator";

export class AdminDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;
}

export class UpdateTournamentAdminsDto {
  @IsArray()
  admins: AdminDto[];
}