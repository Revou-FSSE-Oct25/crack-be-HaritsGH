import { Controller, Get, Post, Body, Patch, Param, Request, ParseIntPipe } from '@nestjs/common';
import { BracketScoreService } from './bracket-score.service';
import { CreateBracketScoreDto } from './dto/create-bracket-score.dto';
import { UpdateBracketScoreDto } from './dto/update-bracket-score.dto';

@Controller('bracket-scores')
export class BracketScoreController {
  constructor(private readonly bracketScoreService: BracketScoreService) {}

  @Post()
  async createScore(@Body() createBracketScoreDto: CreateBracketScoreDto, @Request() req: any) {
    // Called when a score for a match is submitted
    return {
      message: `Score of match ${createBracketScoreDto.roundId} of Tournament ${createBracketScoreDto.tournamentId} created successfully`,
      data: await this.bracketScoreService.createScore(createBracketScoreDto, req.user.userId)
    };
  }

  @Get(':tourid')
  async findByTournamentId(@Param('tourid', ParseIntPipe) tourid: number) {
    // Called when fetching all scores for a tournament
    return {
      message: `Scores for tournament ${tourid} retrieved successfully`,
      data: await this.bracketScoreService.findByTournamentId(tourid)
    };
  }

  @Patch(':tourid')
  async updateScore(@Param('tourid', ParseIntPipe) tourid: number, @Body() updateBracketScoreDto: UpdateBracketScoreDto, @Request() req: any) {
    // Called when revising the score for a match
    return {
      message: `Score of match ${updateBracketScoreDto.roundId} of Tournament ${tourid} updated successfully`,
      data: await this.bracketScoreService.updateScore(tourid,updateBracketScoreDto, req.user.userId)
    };
  }
}
