import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { TournamentRepository } from './tournament.repository';

@Injectable()
export class TournamentService {
  constructor(private readonly tournamentRepository: TournamentRepository) {}
  
  createTourney(createTournamentDto: CreateTournamentDto, creatorUserId: number) {
    const tournamentData = {
      ...createTournamentDto,
      admins: [creatorUserId],
      participants: [],
    };
    return this.tournamentRepository.createTourney(tournamentData);
  }

  findAllTourney(pagination: number = 1) {
    return this.tournamentRepository.findAllTourney(pagination);
  }

  findOneTourney(tourid: number) {
    return this.tournamentRepository.findOneTourney(tourid);
  }

  async updateTourney(tourid: number, updateTournamentDto: UpdateTournamentDto) {
    if (updateTournamentDto.admins) {
      const existingTournament = await this.tournamentRepository.getTourneyAdmins(tourid);
      const existingAdmins = existingTournament?.admins || [];
      const mergedAdmins = [...new Set([...existingAdmins, ...updateTournamentDto.admins])];
      updateTournamentDto.admins = mergedAdmins;
    }
    if (updateTournamentDto.participants) {
      const existingTournament = await this.tournamentRepository.getTourneyParticipants(tourid);
      const existingParticipants = existingTournament?.participants || [];
      const mergedParticipants = [...new Set([...existingParticipants, ...updateTournamentDto.participants])];
      updateTournamentDto.participants = mergedParticipants;
    }
    return this.tournamentRepository.updateTourney(tourid, updateTournamentDto);
  }

  deleteTourney(tourid: number) {
    return this.tournamentRepository.deleteTourney(tourid);
  }

  getTourneyAdmins(tourid: number) {
    return this.tournamentRepository.getTourneyAdmins(tourid);
  }

  getTourneyParticipants(tourid: number) {
    return this.tournamentRepository.getTourneyParticipants(tourid);
  }
}
