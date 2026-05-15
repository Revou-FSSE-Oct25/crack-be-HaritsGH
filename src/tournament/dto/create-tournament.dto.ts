import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateTournamentDto {
  @IsString()
  name: string;

  @IsString()
  game: string;

  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date; // Optional - will be set in service

  @IsString()
  @IsOptional()
  utc?: string; // Optional - defaults to "+0" (UTC+0)
}