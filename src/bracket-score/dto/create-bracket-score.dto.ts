import { IsArray, IsNumber } from "class-validator";

export class CreateBracketScoreDto {
  @IsNumber()
  tournamentId: number;

  @IsNumber()
  roundId: number;
}
