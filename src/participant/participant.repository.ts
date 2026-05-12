import { Injectable } from "@nestjs/common";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

  addParticipant(createParticipantDto: CreateParticipantDto, userId: number) {
    return this.prisma.participant.create({
      data: {
        tournamentId: createParticipantDto.tournamentId,
        userId: userId,
        alias: createParticipantDto.alias,
        prefix: createParticipantDto.prefix
      }
    });
  }

  findTournament(tournamentId: number) {
    return this.prisma.participant.findMany({
      where: { tournamentId }
    });
  }

  findUser(userId: number) {
    return this.prisma.participant.findMany({
      where: { userId }
    });
  }

  findByTournamentAndUser(tournamentId: number, userId: number) {
    return this.prisma.participant.findUnique({
      where: {
        tournamentId_userId: {
          tournamentId,
          userId
        }
      }
    });
  }

  updateParticipation(tournamentId: number, userId: number, req: UpdateParticipantDto) {
    return this.prisma.participant.update({
      where: {
        tournamentId_userId: {
          tournamentId,
          userId
        }
      },
      data: req
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