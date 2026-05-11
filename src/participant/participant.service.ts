import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantRepository } from './participant.repository';

@Injectable()
export class ParticipantService {
  constructor (private readonly participantRepository: ParticipantRepository) {}

  addParticipant(req: CreateParticipantDto) {
    return this.participantRepository.addParticipant(req);
  }

  findTournament(tourid: number) {
    return this.participantRepository.findTournament(tourid);
  }

  findUser(userid: string) {
    return this.participantRepository.findUser(userid);
  }

  updateParticipation(tourid: number, username: string, req: UpdateParticipantDto) {
    return this.participantRepository.updateParticipation(tourid, username, req);
  }

  removeParticipation(tourid: number, username: string) {
    return this.participantRepository.removeParticipation(tourid, username);
  }
}
