import { Injectable } from "@nestjs/common";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { UpdateParticipantDto } from "./dto/update-participant.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async participate(tourid: number, createParticipantDto: CreateParticipantDto, user: any) {
    return await this.prisma.participant.create({
      data: {
        tournamentId: tourid,
        userId: user.userId,
        alias: createParticipantDto.alias,
        prefix: createParticipantDto.prefix || null
      }
    });
  }

  async getParticipatedTournament(userId: number) {
    return await this.prisma.participant.findMany({
      where: { userId }
    });
  }

  async getTournamentParticipant(tournamentId: number) {
    return await this.prisma.participant.findMany({
      where: { tournamentId }
    });
  }

  async updateParticipation(tournamentId: number, userId: number, updateParticipantDto: UpdateParticipantDto) {
    return await this.prisma.participant.update({
      where: {
        tournamentId_userId: {
          tournamentId,
          userId
        }
      },
      data: updateParticipantDto
    });
  }

  async removeParticipation(tournamentId: number, userId: number) {
    return await this.prisma.participant.delete({
      where: {
        tournamentId_userId: {
          tournamentId,
          userId
        }
      }
    });
  }
}