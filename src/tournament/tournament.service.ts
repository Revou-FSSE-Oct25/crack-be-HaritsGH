import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { TournamentRepository } from './tournament.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class TournamentService {
  constructor(
    private readonly tournamentRepository: TournamentRepository,
    private readonly userRepository: UserRepository
  ) {}
  
  async createTourney(createTournamentDto: CreateTournamentDto, creatorUserId: number) {
    if (createTournamentDto.startDate && createTournamentDto.endDate && createTournamentDto.startDate > createTournamentDto.endDate) {
      throw new ConflictException('Start date must be before end date');
    }
    return await this.tournamentRepository.createTourney(createTournamentDto, creatorUserId);
  }

  async findAllTourney(pagination: number = 1) {
    return await this.tournamentRepository.findAllTourney(pagination);
  }

  async findOneTourney(tourid: number) {
    return await this.tournamentRepository.findOneTourney(tourid);
  }

  async searchTourney(query: string) {
    return await this.tournamentRepository.searchTourney(query);
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

    if (updateTournamentDto.startDate && updateTournamentDto.endDate && updateTournamentDto.startDate > updateTournamentDto.endDate) {
      throw new ConflictException('Start date must be before end date');
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

  async updateTourneyAdmins(tourid: number, adminsUsername: string[], requesterId: number) {
    const tournament = await this.tournamentRepository.findOneTourney(tourid);
    if (requesterId !== tournament?.owner) {
      throw new UnauthorizedException('Only owner can update admins');
    }

    const rawAdminsIds = await Promise.all(adminsUsername.map(async (username) => {
      const profile = await this.userRepository.getProfile(username);
      return profile?.id;
    }));

    let adminsIds = rawAdminsIds.filter((id): id is number => id !== undefined);

    if (adminsIds.length === 0) {
      adminsIds = [requesterId];
    }
    return await this.tournamentRepository.updateTourneyAdmins(tourid, adminsIds);
  }
  
  async checkForAdmin(userId: number) {
    const tournaments = await this.tournamentRepository.checkForAdmin(userId);
    return {tournaments: [...new Set(tournaments.map(tournament => tournament.id))]};
  }
}
