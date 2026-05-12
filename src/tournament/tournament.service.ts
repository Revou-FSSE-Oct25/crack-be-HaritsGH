import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { TournamentRepository } from './tournament.repository';

@Injectable()
export class TournamentService {
  constructor(private readonly tournamentRepository: TournamentRepository) {}
  
  async createTourney(createTournamentDto: CreateTournamentDto, creatorUserId: number) {
    return await this.tournamentRepository.createTourney(createTournamentDto, creatorUserId);
  }

  async findAllTourney(pagination: number = 1) {
    return await this.tournamentRepository.findAllTourney(pagination);
  }

  async findOneTourney(tourid: number) {
    return await this.tournamentRepository.findOneTourney(tourid);
  }

  async updateTourney(tourid: number, updateTournamentDto: UpdateTournamentDto, requesterId: number) {
    const admins = await this.tournamentRepository.findOneTourney(tourid);
    if (!admins?.admins?.includes(requesterId)) {
      throw new UnauthorizedException('Only admins can update tournament');
    }
    
    if (updateTournamentDto.admins) {
      const existingAdmins = admins?.admins || [];
      const mergedAdmins = [...new Set([...existingAdmins, ...updateTournamentDto.admins])];
      updateTournamentDto.admins = mergedAdmins;
    }
    return await this.tournamentRepository.updateTourney(tourid, updateTournamentDto);
  }

  async deleteTourney(tourid: number, requesterId: number) {
    const owner = await this.tournamentRepository.findOneTourney(tourid);
    if (requesterId !== owner?.owner) {
      throw new UnauthorizedException('Only owner can delete tournament');
    }
    return await this.tournamentRepository.deleteTourney(tourid);
  }

  async updateTourneyAdmins(tourid: number, adminIds: number[], requesterId: number) {
    const owner = await this.tournamentRepository.findOneTourney(tourid);
    if (requesterId !== owner?.owner) {
      throw new UnauthorizedException('Only owner can update admins');
    }

    if (adminIds.length === 0) {
      adminIds = [requesterId];
    }
    return await this.tournamentRepository.updateTourneyAdmins(tourid, adminIds);
  }
}
