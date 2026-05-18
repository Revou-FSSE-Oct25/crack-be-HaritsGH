import { Controller, Get, Post, Body, Patch, Param, Request, ParseIntPipe } from '@nestjs/common';
import { BracketScoreService } from './bracket-score.service';
import { CreateBracketScoreDto } from './dto/create-bracket-score.dto';
import { UpdateBracketScoreDto } from './dto/update-bracket-score.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('bracket-score')
export class BracketScoreController {
  constructor(private readonly bracketScoreService: BracketScoreService) {}

  @Post()
  async createScore(@Body() body: { participantList: CreateBracketScoreDto | CreateBracketScoreDto[] }, @Request() req: any) {
    // Called when the tournament bracked is initialized
    const createBracketScoreDto = body.participantList;
    const tournamentId = Array.isArray(createBracketScoreDto) ? createBracketScoreDto[0]?.tournamentId : createBracketScoreDto.tournamentId;
    return {
      message: `Score of Tournament ${tournamentId} initiated successfully`,
      data: await this.bracketScoreService.createScore(createBracketScoreDto, req.user.userId)
    };
  }

  @Public()
  @Get(':tourid')
  async findScoreByTournamentId(@Param('tourid', ParseIntPipe) tourid: number) {
    // Called when fetching all scores for a tournament
    return {
      message: `Scores for tournament ${tourid} retrieved successfully`,
      data: await this.bracketScoreService.findScoreByTournamentId(tourid)
    };
  }

  @Patch(':tourid')
  async updateScore(@Param('tourid', ParseIntPipe) tourid: number, @Body() updateBracketScoreDto: UpdateBracketScoreDto, @Request() req: any) {
    // Called when a score is submitted or revising the score for a match
    return {
      message: `Score of match ${updateBracketScoreDto.matchId} of Tournament ${tourid} updated successfully`,
      data: await this.bracketScoreService.updateScore(tourid,updateBracketScoreDto, req.user.userId)
    };
  }
}
