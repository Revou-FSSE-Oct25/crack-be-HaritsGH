export class UpdateBracketScoreDto{
  roundId: number;
  userIds?: number[];
  scores?: number[];
  winnerId?: number;
}