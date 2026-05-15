import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, ParseIntPipe, Put, Req } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { UpdateTournamentAdminsDto } from './dto/update-tournament-admins.dto';
import { Public } from 'src/auth/decorators/public.decorator';

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

  @Public()
  @Get()
  async findAllTourney(@Query('page', new ParseIntPipe({ optional: true })) page?: number) {
    // For fetching all tournaments with pagination at browsing page
    // Not including properties like admins and participants
    const pagination = page || 1;
    return {
      message: `Fetched page ${pagination} of tounament list`,
      data: await this.tournamentService.findAllTourney(pagination)
    };
  }

  @Get('check-for-admin')
  async checkForAdmin(@Request() req: any) {
    // For checking if the user is an admin of any tournament
    return {
      message: `Checked if user with id ${req.user.userId} is an admin`,
      data: await this.tournamentService.checkForAdmin(req.user.userId)
    };
  }

  @Public()
  @Get(':tourid')
  async findOneTourney(@Param('tourid', ParseIntPipe) tourid: number) {
    // For fetching a specific tournament by ID
    return {
      message: `Fetched tounament with id ${tourid}`,
      data: await this.tournamentService.findOneTourney(tourid)};
  }

  @Public()
  @Get('search')
  async searchTourney(@Query('q') q: string, @Query('page', new ParseIntPipe({ optional: true })) page?:number) {
    // For searching tournaments by name
    return {
      message: `Searched tounaments with query ${q}`,
      data: await this.tournamentService.searchTourney(q)};
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
      message: `Tournament with id ${tourid} now has ${updateAdminDto.admins.join(', ')} as admins`,
      data: await this.tournamentService.updateTourneyAdmins(tourid, updateAdminDto.admins, req.user.username)
    };
  }
}
