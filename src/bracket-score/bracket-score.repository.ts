import { Injectable } from "@nestjs/common";
import { CreateBracketScoreDto } from "./dto/create-bracket-score.dto";
import { UpdateBracketScoreDto } from "./dto/update-bracket-score.dto";

export interface BracketScore {
  id: number;
  tournamentId: number;
  roundId: number;
  usersId: string[];
  score: number[];
  winnerId: string;
}

@Injectable()
export class BracketScoreRepository {
  private bracketScores: BracketScore[] = [];

  create(createBracketScoreDto: CreateBracketScoreDto): BracketScore {
    const newBracketScore: BracketScore = {
      id: this.bracketScores.length + 1,
      ...createBracketScoreDto,
    };
    this.bracketScores.push(newBracketScore);
    return newBracketScore;
  }

  findByTournamentId(tournamentId: number): BracketScore[] {
    return this.bracketScores.filter(score => score.tournamentId === tournamentId);
  }

  findByTournamentAndRound(tournamentId: number, roundId: number): BracketScore | null {
    return this.bracketScores.find(
      score => score.tournamentId === tournamentId && score.roundId === roundId
    ) || null;
  }

  updateByTournamentAndRound(
    tournamentId: number, 
    roundId: number, 
    updateBracketScoreDto: UpdateBracketScoreDto
  ): BracketScore | null {
    const index = this.bracketScores.findIndex(
      score => score.tournamentId === tournamentId && score.roundId === roundId
    );
    
    if (index === -1) {
      return null;
    }
    
    this.bracketScores[index] = { ...this.bracketScores[index], ...updateBracketScoreDto };
    return this.bracketScores[index];
  }

  findAll(): BracketScore[] {
    return this.bracketScores;
  }
}
