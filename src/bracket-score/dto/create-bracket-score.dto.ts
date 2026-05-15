import { IsArray, IsNumber } from "class-validator";

export class CreateBracketScoreDto {
  @IsNumber()
  tournamentId: number;

  @IsNumber()
  roundId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];
}
