import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateBracketScoreDto } from "./dto/create-bracket-score.dto";
import { UpdateBracketScoreDto } from "./dto/update-bracket-score.dto";

@Injectable()
export class BracketScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createScore(createBracketScoreDto: CreateBracketScoreDto) {
    return this.prisma.bracketScore.upsert({
      where: {
        tournamentId_matchId: {
          tournamentId: createBracketScoreDto.tournamentId,
          matchId: createBracketScoreDto.matchId,
        },
      },
      create: {
        ...createBracketScoreDto,
        scores: [0, 0],
        winnerId: null,
      },
      update: {},
    });
  }

  async findScoreByTournamentId(tournamentId: number) {
    const results = await this.prisma.bracketScore.findMany({
      where: {
        tournamentId,
      },
      orderBy: {
        matchId: 'asc',
      },
    });
    
    // Preserve array order by creating new arrays
    return results.map(item => ({
      ...item,
      userIds: [...item.userIds],
      scores: [...item.scores]
    }));
  }

  async updateScore(tournamentId: number, updateBracketScoreDto: UpdateBracketScoreDto) {
    return this.prisma.bracketScore.update({
      where: {
        tournamentId_matchId: {
          tournamentId,
          matchId: updateBracketScoreDto.matchId,
        },
      },
      data: updateBracketScoreDto
    });
  }
}
