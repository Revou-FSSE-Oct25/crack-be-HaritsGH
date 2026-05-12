export class CreateBracketScoreDto {
  tournamentId: number;
  roundId: number;
  userIds: number[];
  scores: number[];
  winnerId: number;
}
