import { Injectable } from '@nestjs/common';
import { CreateBracketScoreDto } from './dto/create-bracket-score.dto';
import { UpdateBracketScoreDto } from './dto/update-bracket-score.dto';
import { BracketScoreRepository, BracketScore } from './bracket-score.repository';

@Injectable()
export class BracketScoreService {
  constructor(private readonly bracketScoreRepository: BracketScoreRepository) {}

  create(createBracketScoreDto: CreateBracketScoreDto): BracketScore {
    return this.bracketScoreRepository.create(createBracketScoreDto);
  }

  findByTournamentId(tournamentId: number): BracketScore[] {
    return this.bracketScoreRepository.findByTournamentId(tournamentId);
  }

  updateByTournamentAndRound(tournamentId: number, roundId: number, updateBracketScoreDto: UpdateBracketScoreDto) {
    const updatedScore = this.bracketScoreRepository.updateByTournamentAndRound(
      tournamentId, 
      roundId, 
      updateBracketScoreDto
    );
    
    if (!updatedScore) {
      return { message: 'Bracket score not found for the specified tournament and round' };
    }
    
    return updatedScore;
  }
}

export type { BracketScore };
