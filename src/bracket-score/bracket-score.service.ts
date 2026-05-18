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

  async createScore(createBracketScoreDto: CreateBracketScoreDto | CreateBracketScoreDto[], requesterId: number) {
    const results: any[] = [];
    const dtos = Array.isArray(createBracketScoreDto) ? createBracketScoreDto : [createBracketScoreDto];

    for (const dto of dtos) {
      if (!dto.tournamentId) {
        throw new ConflictException('tournamentId is required');
      }

      const tournament = await this.tournamentRepository.findOneTourney(dto.tournamentId);

      if (!tournament?.admins?.includes(requesterId) || tournament?.owner !== requesterId) {
        throw new UnauthorizedException('User is not an admin of this tournament');
      }

      // if (tournament?.status !== 'Ongoing') {
      //   throw new ConflictException('Unable to submit score for a non-ongoing tournament');
      // }

      // const tournnamentScore = await this.bracketScoreRepository.findScoreByTournamentId(dto.tournamentId);
      // if (tournnamentScore.some(score => score.matchId === dto.matchId)) {
      //   throw new ConflictException('Score already created for this round');
      // }

      if (!dto.userIds) {
        dto.userIds = [0, 0];
      }

      results.push(await this.bracketScoreRepository.createScore(dto));
    }

    return results;
  }

  async findScoreByTournamentId(tournamentId: number) {
    return this.bracketScoreRepository.findScoreByTournamentId(tournamentId);
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
