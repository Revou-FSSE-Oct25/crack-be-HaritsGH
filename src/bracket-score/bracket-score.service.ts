import { Injectable, NotFoundException } from '@nestjs/common';
import { BracketScoreDto } from './dto/bracket-score.dto';
import { BracketScoreRepository } from './bracket-score.repository';

@Injectable()
export class BracketScoreService {
  constructor(private readonly bracketScoreRepository: BracketScoreRepository) {}

  async createScore(tournamentId: number, createBracketScoreDto: BracketScoreDto) {
    return this.bracketScoreRepository.createScore(tournamentId, createBracketScoreDto);
  }

  async findByTournamentId(tournamentId: number) {
    return this.bracketScoreRepository.findByTournamentId(tournamentId);
  }

  async updateScore(tournamentId: number, updateBracketScoreDto: BracketScoreDto) {
    return await this.bracketScoreRepository.updateScore(tournamentId, updateBracketScoreDto);
  }
}
