import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, ParseIntPipe, Put } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { UpdateTournamentAdminsDto } from './dto/update-tournament-admins.dto';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  async createTourney(@Body() createTournamentDto: CreateTournamentDto, @Request() req: any) {
    // For creating a tournament
    // Automatically add the current user as an admin
    return {
      message: 'New tournament created',
      data: await this.tournamentService.createTourney(createTournamentDto, req.user.userId) 
    };
  }

  @Get()
  async findAllTourney(@Query('page') page?: number) {
    // For fetching all tournaments with pagination at browsing page
    // Not including properties like admins and participants
    const pagination = page || 1;
    return {
      message: `Fetched page ${pagination} of tounament list`,
      data: await this.tournamentService.findAllTourney(pagination)
    };
  }

  @Get(':tourid')
  async findOneTourney(@Param('tourid', ParseIntPipe) tourid: number) {
    // For fetching a specific tournament by ID
    return {
      message: `Fetched tounament with id ${tourid}`,
      data: await this.tournamentService.findOneTourney(tourid)};
  }

  @Patch(':tourid')
  async updateTourney(@Param('tourid', ParseIntPipe) tourid: number, @Body() req: UpdateTournamentDto, @Request() request: any) {
    // For updating a specific tournament by ID
    return {
      message: `Updated tounament with id ${tourid}`,
      data: await this.tournamentService.updateTourney(tourid, req, request.user.userId)};
  }

  @Delete(':tourid')
  async deleteTourney(@Param('tourid', ParseIntPipe) tourid: number, @Request() req: any) {
    // For deleting a specific tournament by ID
    return {
      message: `Deleted tounament with id ${tourid}`,
      data: await this.tournamentService.deleteTourney(tourid, req.user.userId)
    };
  }
  
  @Put(':tourid/admins')
  async updateTourneyAdmins(@Param('tourid', ParseIntPipe) tourid: number, @Body() updateAdminDto: UpdateTournamentAdminsDto, @Request() req: any) {
    // For updating admins of a specific tournament by ID
    return {
      message: `Tournament with id ${tourid} now has admins with ids ${updateAdminDto.admins}`,
      data: await this.tournamentService.updateTourneyAdmins(tourid, updateAdminDto.admins, req.user.userId)
    };
  }
}
