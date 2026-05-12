import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { request } from 'http';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  createTourney(@Body() createTournamentDto: CreateTournamentDto, @Request() req: any) {
    // For creating a tournament
    // Automatically add the current user as an admin
    return {
      message: 'New tournament created',
      data: this.tournamentService.createTourney(createTournamentDto, req.user.id) 
    };
  }

  @Get()
  findAllTourney(@Query('page') page?: number) {
    // For fetching all tournaments with pagination at browsing page
    // Not including properties like admins and participants
    const pagination = page || 1;
    return {
      message: `Fetched page ${pagination} of tounament list`,
      data: this.tournamentService.findAllTourney(pagination)
    };
  }

  @Get(':tourid')
  findOneTourney(@Param('tourid') tourid: number) {
    // For fetching a specific tournament by ID
    return {
      message: `Fetched tounament with id ${tourid}`,
      data: this.tournamentService.findOneTourney(tourid)};
  }

  @Patch(':tourid')
  updateTourney(@Param('tourid') tourid: number, @Body() req: UpdateTournamentDto) {
    // For updating a specific tournament by ID
    return {
      message: `Updated tounament with id ${tourid}`,
      data: this.tournamentService.updateTourney(tourid, req)};
  }

  @Delete(':tourid')
  deleteTourney(@Param('tourid') tourid: number) {
    // For deleting a specific tournament by ID
    return {
      message: `Deleted tounament with id ${tourid}`,
      data: this.tournamentService.deleteTourney(tourid)
    };
  }

  @Get(':tourid/admins')
  getTourneyAdmins(@Param('tourid') tourid: number) {
    // For fetching admins of a specific tournament by ID used for granting permissions
    return {
      message: `Fetched tourney admins for tournament with id ${tourid}`,
      data: this.tournamentService.getTourneyAdmins(tourid)
    };
  }

  @Get(':tourid/participants')
  getTourneyParticipants(@Param('tourid') tourid: number) {
    // For fetching participants of a specific tournament by ID
    return {
      message: `Fetched participants for tournament with id ${tourid}`,
      data: this.tournamentService.getTourneyParticipants(tourid)
    };
  }
}
