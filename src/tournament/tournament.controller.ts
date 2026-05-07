import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  create(@Body() req: CreateTournamentDto) {
    return this.tournamentService.create(req);
  }

  @Get()
  findAll() {
    return this.tournamentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tournamentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() req: UpdateTournamentDto) {
    return this.tournamentService.update(id, req);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tournamentService.remove(id);
  }
}
