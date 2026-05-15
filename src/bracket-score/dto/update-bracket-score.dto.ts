import { IsArray, IsNumber, IsOptional } from "class-validator";

export class UpdateBracketScoreDto{
  @IsNumber()
  roundId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  userIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  scores?: number[];

  @IsNumber()
  @IsOptional()
  winnerId?: number;
}