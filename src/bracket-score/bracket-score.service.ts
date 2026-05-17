import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BracketScoreRepository } from './bracket-score.repository';
import { TournamentRepository } from '../tournament/tournament.repository';
import { CreateBracketScoreDto } from './dto/create-bracket-score.dto';
import { UpdateBracketScoreDto } from './dto/update-bracket-score.dto';

@Injectable()
export class BracketScoreService {
  constructor(
    private readonly bracketScoreRepository: BracketScoreRepository,
    private readonly tournamentRepository: TournamentRepository,
  ) {}

  async createScore(createBracketScoreDto: CreateBracketScoreDto, requesterId: number) {
    const tournament = await this.tournamentRepository.findOneTourney(createBracketScoreDto.tournamentId);

    if (!tournament?.admins?.includes(requesterId) || tournament?.owner !== requesterId) {
      throw new UnauthorizedException('User is not an admin of this tournament');
    }

    if (tournament?.status !== 'Ongoing') {
      throw new ConflictException('Unable to submit score for a non-ongoing tournament');
    }

    const tournnamentScore = await this.bracketScoreRepository.findByTournamentId(createBracketScoreDto.tournamentId);
    if (tournnamentScore.some(score => score.matchId === createBracketScoreDto.matchId)) {
      throw new ConflictException('Score already created for this round');
    }

    return this.bracketScoreRepository.createScore(createBracketScoreDto);
  }

  async findByTournamentId(tournamentId: number) {
    return this.bracketScoreRepository.findByTournamentId(tournamentId);
  }

  async updateScore(tourid: number, updateBracketScoreDto: UpdateBracketScoreDto, requesterId: number) {
    const tournament = await this.tournamentRepository.findOneTourney(tourid);
    if (!tournament?.admins?.includes(requesterId) || tournament?.owner !== requesterId) {
      throw new UnauthorizedException('User is not an admin of this tournament');
    }

    if (tournament?.status !== 'Ongoing') {
      throw new ConflictException('Unable to edit score for a non-ongoing tournament');
    }
    return await this.bracketScoreRepository.updateScore(tourid, updateBracketScoreDto);
  }
}
