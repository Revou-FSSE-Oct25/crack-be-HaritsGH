export class CreateBracketScoreDto {
  tournamentId: number;
  roundId: number;
  usersId: string[];
  score: number[];
  winnerId: string;
}
