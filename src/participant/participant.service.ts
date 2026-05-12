import { ConflictException, Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantRepository } from './participant.repository';
import { TournamentRepository } from 'src/tournament/tournament.repository';

@Injectable()
export class ParticipantService {
  constructor (
    private readonly participantRepository: ParticipantRepository, 
    private readonly tournamentRepository: TournamentRepository
  ) {}

  async participate(tourid: number, createParticipantDto: CreateParticipantDto, userId: number) {
    const tourStatus = await this.tournamentRepository.findOneTourney(tourid);
    if (tourStatus?.status !== 'Upcoming') {
      throw new ConflictException('Unable to join a started tournament');
    }

    const participated = await this.participantRepository.getTournamentParticipant(tourid);
    if (participated.some(p => p.userId === userId)) {
      throw new ConflictException('User already participated in this tournament');
    }
    
    return await this.participantRepository.participate(tourid, createParticipantDto, userId);
  }

  async getParticipatedTournament(userid: number) {
    return await this.participantRepository.getParticipatedTournament(userid);
  }

  async getTournamentParticipant(tourid: number) {
    return await this.participantRepository.getTournamentParticipant(tourid);
  }

  async updateParticipation(tourid: number, userid: number, updateParticipantDto: UpdateParticipantDto) {
    const tourStatus = await this.tournamentRepository.findOneTourney(tourid);
    if (tourStatus?.status !== 'Upcoming') {
      throw new ConflictException('Unable to edit tournament participation');
    }

    const participated = await this.participantRepository.getTournamentParticipant(tourid);
    if (!participated.some(p => p.userId === userid)) {
      throw new ConflictException('User is not participating in this tournament');
    }
    
    return await this.participantRepository.updateParticipation(tourid, userid, updateParticipantDto);
  }

  async removeParticipation(tourid: number, userid: number) {
    const tourStatus = await this.tournamentRepository.findOneTourney(tourid);
    if (tourStatus?.status !== 'Upcoming') {
      throw new ConflictException('Unable to cancel tournament participation');
    }

    const participated = await this.participantRepository.getTournamentParticipant(tourid);
    if (!participated.some(p => p.userId === userid)) {
      throw new ConflictException('User is not participating in this tournament');
    }
    
    return await this.participantRepository.removeParticipation(tourid, userid);
  }
}
