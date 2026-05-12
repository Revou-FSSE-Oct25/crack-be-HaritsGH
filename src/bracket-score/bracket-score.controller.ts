import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { BracketScoreService } from './bracket-score.service';
import { CreateBracketScoreDto } from './dto/create-bracket-score.dto';
import { UpdateBracketScoreDto } from './dto/update-bracket-score.dto';

@Controller('bracket-scores')
export class BracketScoreController {
  constructor(private readonly bracketScoreService: BracketScoreService) {}

  @Post()
  async createScore(@Body() createBracketScoreDto: CreateBracketScoreDto) {
    // Called when a score for a match is submitted
    return this.bracketScoreService.createScore(createBracketScoreDto);
  }

  @Get(':tourid')
  async findByTournamentId(@Param('tourid') tourid: number) {
    // Called when fetching all scores for a tournament
    return this.bracketScoreService.findByTournamentId(tourid);
  }

  @Patch(':tourid/:roundid')
  async updateScore(
    @Param('tourid') tourid: number,
    @Param('roundid') roundid: number,
    @Body() updateBracketScoreDto: UpdateBracketScoreDto,
  ) {
    // Called when revising the score for a match
    return this.bracketScoreService.updateScore(tourid, roundid, updateBracketScoreDto);
  }
}
