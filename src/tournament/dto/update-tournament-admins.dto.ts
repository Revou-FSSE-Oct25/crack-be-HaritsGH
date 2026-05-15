import { IsArray, IsString } from "class-validator";

export class UpdateTournamentAdminsDto {
  @IsArray()
  @IsString({ each: true })
  admins: string[];
}