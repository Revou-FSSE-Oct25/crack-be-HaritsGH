import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  create(@Body() req: CreateTournamentDto) {
    return {
      message: 'New user created',
      data: this.tournamentService.create(req) 
    };
  }

  @Get()
  findAll(@Param() pagination?: number) {
    return {
      message: `Fetched page ${pagination? pagination : 1} of tounament list`,
      data: this.tournamentService.findAll(pagination)
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return {
      message: `Fetched tounament with id ${id}`,
      data: this.tournamentService.findOne(id)};
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() req: UpdateTournamentDto) {
    return {
      message: `Updated tounament with id ${id}`,
      data: this.tournamentService.update(id, req)};
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return {
      message: `Deleted tounament with id ${id}`,
      data: this.tournamentService.remove(id)
    };
  }

  @Get(':id/admins')
  getTourneyAdmins(@Param('id') id: number) {
    return {
      message: `Fetched tourney admins for tournament with id ${id}`,
      data: this.tournamentService.getTourneyAdmins(id)
    };
  }

  @Get(':id/participants')
  getTourneyParticipants(@Param('id') id: number) {
    return {
      message: `Fetched participants for tournament with id ${id}`,
      data: this.tournamentService.getTourneyParticipants(id)
    };
  }
}
