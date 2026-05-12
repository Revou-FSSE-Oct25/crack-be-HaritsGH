import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { BracketScoreService } from './bracket-score.service';
import { BracketScoreDto } from './dto/bracket-score.dto';

@Controller('bracket-scores')
export class BracketScoreController {
  constructor(private readonly bracketScoreService: BracketScoreService) {}

  @Post(':tourid')
  async createScore(@Param('tourid') tourid: number, @Body() createBracketScoreDto: BracketScoreDto) {
    // Called when a score for a match is submitted
    return this.bracketScoreService.createScore(tourid, createBracketScoreDto);
  }

  @Get(':tourid')
  async findByTournamentId(@Param('tourid') tourid: number) {
    // Called when fetching all scores for a tournament
    return this.bracketScoreService.findByTournamentId(tourid);
  }

  @Patch(':tourid')
  async updateScore(
    @Param('tourid') tourid: number, @Body() updateBracketScoreDto: BracketScoreDto,
  ) {
    // Called when revising the score for a match
    return this.bracketScoreService.updateScore(tourid, updateBracketScoreDto);
  }
}
