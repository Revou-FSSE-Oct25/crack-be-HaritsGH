import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BracketScoreService } from './bracket-score.service';
import { CreateBracketScoreDto } from './dto/create-bracket-score.dto';
import { UpdateBracketScoreDto } from './dto/update-bracket-score.dto';

@Controller('bracket-score')
export class BracketScoreController {
  constructor(private readonly bracketScoreService: BracketScoreService) {}

  @Post()
  create(@Body() createBracketScoreDto: CreateBracketScoreDto) {
    return this.bracketScoreService.create(createBracketScoreDto);
  }

  @Get()
  findAll() {
    return this.bracketScoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bracketScoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBracketScoreDto: UpdateBracketScoreDto) {
    return this.bracketScoreService.update(+id, updateBracketScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bracketScoreService.remove(+id);
  }
}
