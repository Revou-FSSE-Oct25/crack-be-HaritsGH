import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantRepository } from './participant.repository';

@Injectable()
export class ParticipantService {
  constructor (private readonly participantRepository: ParticipantRepository) {}

  addParticipant(createParticipantDto: CreateParticipantDto, userId: number) {
    return this.participantRepository.addParticipant(createParticipantDto, userId);
  }

  findTournament(tourid: number) {
    return this.participantRepository.findTournament(tourid);
  }

  findUser(userid: number) {
    return this.participantRepository.findUser(userid);
  }

  updateParticipation(tourid: number, userid: number, updateParticipantDto: UpdateParticipantDto) {
    return this.participantRepository.updateParticipation(tourid, userid, updateParticipantDto);
  }

  removeParticipation(tourid: number, userid: number) {
    return this.participantRepository.removeParticipation(tourid, userid);
  }
}
