import { Injectable } from "@nestjs/common";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

  participate(tourid: number, createParticipantDto: CreateParticipantDto, userId: number) {
    return this.prisma.participant.create({
      data: {
        tournamentId: tourid,
        userId: userId,
        alias: createParticipantDto.alias,
        prefix: createParticipantDto.prefix || null
      }
    });
  }

  getParticipatedTournament(userId: number) {
    return this.prisma.participant.findMany({
      where: { userId }
    });
  }

  getTournamentParticipant(tournamentId: number) {
    return this.prisma.participant.findMany({
      where: { tournamentId }
    });
  }

  updateParticipation(tournamentId: number, userId: number, updateParticipantDto: UpdateParticipantDto) {
    return this.prisma.participant.update({
      where: {
        tournamentId_userId: {
          tournamentId,
          userId
        }
      },
      data: updateParticipantDto
    });
  }

  removeParticipation(tournamentId: number, userId: number) {
    return this.prisma.participant.delete({
      where: {
        tournamentId_userId: {
          tournamentId,
          userId
        }
      }
    });
  }
}