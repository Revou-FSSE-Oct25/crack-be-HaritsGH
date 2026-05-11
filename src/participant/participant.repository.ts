import { Injectable } from "@nestjs/common";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";

type Participant = {
  tournamentId: number;
  userId: string;
  alias: string;
  prefix: string;
}

@Injectable()
export class ParticipantRepository {
  private participantList: Participant[] = [];

  addParticipant(req: CreateParticipantDto) {
    const participant: Participant = {
      tournamentId: req.tournamentId,
      userId: req.userId,
      alias: req.alias,
      prefix: req.prefix
    };
    this.participantList.push(participant);
    return participant;
  }

  findTournament(tournamentId: number) {
    return this.participantList.filter(p => p.tournamentId === tournamentId);
  }

  findUser(userId: string) {
    return this.participantList.filter(p => p.userId === userId);
  }

  findByTournamentAndUser(tournamentId: number, userId: string) {
    return this.participantList.find(p => p.tournamentId === tournamentId && p.userId === userId);
  }

  updateParticipation(tournamentId: number, userId: string, req: UpdateParticipantDto) {
    const participant = this.findByTournamentAndUser(tournamentId, userId);
    if (participant) {
      if (req.alias) participant.alias = req.alias;
      if (req.prefix) participant.prefix = req.prefix;
    }
    return this.findByTournamentAndUser(tournamentId, userId);
  }

  removeParticipation(tournamentId: number, userId: string) {
    const participant = this.findByTournamentAndUser(tournamentId, userId);
    if (participant) {
      const index = this.participantList.indexOf(participant);
      this.participantList.splice(index, 1);
    }
    return participant;
  }
}