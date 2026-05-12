import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateBracketScoreDto } from "./dto/create-bracket-score.dto";
import { UpdateBracketScoreDto } from "./dto/update-bracket-score.dto";

@Injectable()
export class BracketScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createScore(createBracketScoreDto: CreateBracketScoreDto) {
    return this.prisma.bracketScore.create({
      data: createBracketScoreDto,
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

  async updateScore(tournamentId: number, roundId: number, updateBracketScoreDto: UpdateBracketScoreDto) {
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
