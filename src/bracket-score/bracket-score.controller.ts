import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { BracketScoreService } from './bracket-score.service';
import { CreateBracketScoreDto } from './dto/create-bracket-score.dto';
import { UpdateBracketScoreDto } from './dto/update-bracket-score.dto';

@Controller('bracket-scores')
export class BracketScoreController {
  constructor(private readonly bracketScoreService: BracketScoreService) {}

  @Post()
  create(@Body() createBracketScoreDto: CreateBracketScoreDto) {
    return this.bracketScoreService.create(createBracketScoreDto);
  }

  @Get(':tourid')
  findByTournamentId(@Param('tourid') tourid: number) {
    return this.bracketScoreService.findByTournamentId(tourid);
  }

  @Patch(':tourid')
  update(
    @Param('tourid') tourid: number,
    @Query('roundid') roundid: number,
    @Body() updateBracketScoreDto: UpdateBracketScoreDto,
  ) {
    return this.bracketScoreService.updateByTournamentAndRound(tourid, roundid, updateBracketScoreDto);
  }
}
