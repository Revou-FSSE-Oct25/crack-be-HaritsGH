import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBracketScoreDto } from './dto/create-bracket-score.dto';
import { UpdateBracketScoreDto } from './dto/update-bracket-score.dto';
import { BracketScoreRepository } from './bracket-score.repository';

@Injectable()
export class BracketScoreService {
  constructor(private readonly bracketScoreRepository: BracketScoreRepository) {}

  async createScore(createBracketScoreDto: CreateBracketScoreDto) {
    return this.bracketScoreRepository.createScore(createBracketScoreDto);
  }

  async findByTournamentId(tournamentId: number) {
    return this.bracketScoreRepository.findByTournamentId(tournamentId);
  }

  async updateScore(tournamentId: number, roundId: number, updateBracketScoreDto: UpdateBracketScoreDto) {
    try {
      const updatedScore = await this.bracketScoreRepository.updateScore(
        tournamentId, 
        roundId, 
        updateBracketScoreDto
      );
      
      return updatedScore;
    } catch (error) {
      throw new NotFoundException('Bracket score not found for the specified tournament and round');
    }
  }
}
