import { IsArray, IsNumber, IsOptional } from "class-validator";

export class CreateBracketScoreDto {
  @IsNumber()
  tournamentId: number;

  @IsNumber()
  matchId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  userIds?: number[];
}
