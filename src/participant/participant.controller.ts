import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('participants')
@UseGuards(JwtAuthGuard)
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post(':tourid')
  participate(@Param('tourid') tourid: number, @Body() createParticipantDto: CreateParticipantDto, @Request() req: any) {
    return this.participantService.participate(tourid, createParticipantDto, req.user.userId);
  }

  @Get()
  getParticipatedTournament(@Request() req: any) {
    return this.participantService.getParticipatedTournament(req.user.userId);
  }

  @Get(':tourid')
  getTournamentParticipant(@Param('tourid') tourid: number) {
    return this.participantService.getTournamentParticipant(tourid);
  }

  @Patch(':tourid')
  updateParticipation(@Param('tourid') tourid: number, @Body() updateParticipantDto: UpdateParticipantDto, @Request() req: any) {
    // Only allowed if the tournament has not started yet
    return this.participantService.updateParticipation(tourid, req.user.userId, updateParticipantDto);
  }

  @Delete(':tourid')
  cancelParticipation(@Param('tourid') tourid: number, @Request() req: any) {
    // Only allowed if the tournament has not started yet
    return this.participantService.removeParticipation(tourid, req.user.userId);
  }
}
