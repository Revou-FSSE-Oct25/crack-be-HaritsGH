import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { BracketScoreDto } from "./dto/bracket-score.dto";

@Injectable()
export class BracketScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createScore(tournamentId: number, createBracketScoreDto: BracketScoreDto) {
    return this.prisma.bracketScore.create({
      data: {
        ...createBracketScoreDto,
        tournamentId,
      },
    });
  }

  async findByTournamentId(tournamentId: number) {
    return this.prisma.bracketScore.findMany({
      where: {
        tournamentId,
      },
    });
  }

  async findByTournamentAndRound(tournamentId: number, roundId: number) {
    return this.prisma.bracketScore.findUnique({
      where: {
        tournamentId_roundId: {
          tournamentId,
          roundId,
        },
      },
    });
  }

  async updateScore(tournamentId: number, roundId: number, updateBracketScoreDto: BracketScoreDto) {
    return this.prisma.bracketScore.update({
      where: {
        tournamentId_roundId: {
          tournamentId,
          roundId,
        },
      },
      data: updateBracketScoreDto,
    });
  }
}
