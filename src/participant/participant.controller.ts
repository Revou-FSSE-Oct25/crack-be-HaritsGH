import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('participant')
@UseGuards(JwtAuthGuard)
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post(':tourid')
  async participate(@Param('tourid', ParseIntPipe) tourid: number, @Body() createParticipantDto: CreateParticipantDto, @Request() req: any) {
    return {
      message: 'Participation created successfully',
      data: await this.participantService.participate(tourid, createParticipantDto, req.user)
    };
  }

  @Get()
  async getParticipatedTournament(@Request() req: any) {
    return {
      message: 'Participated tournaments retrieved successfully',
      data: await this.participantService.getParticipatedTournament(req.user.userId)
    };
  }

  @Public()
  @Get(':tourid')
  async getTournamentParticipant(@Param('tourid', ParseIntPipe) tourid: number) {
    return {
      message: `Tournament ${tourid} participants retrieved successfully`,
      data: await this.participantService.getTournamentParticipant(tourid)
    };
  }

  @Patch(':tourid')
  async updateParticipation(@Param('tourid', ParseIntPipe) tourid: number, @Body() updateParticipantDto: UpdateParticipantDto, @Request() req: any) {
    // Only allowed if the tournament has not started yet
    return {
      message: 'Participation updated successfully',
      data: await this.participantService.updateParticipation(tourid, req.user.userId, updateParticipantDto)
    };
  }

  @Delete(':tourid')
  async cancelParticipation(@Param('tourid', ParseIntPipe) tourid: number, @Request() req: any) {
    // Only allowed if the tournament has not started yet
    return {
      message: 'Participation cancelled successfully',
      data: await this.participantService.removeParticipation(tourid, req.user.userId)
    };
  }
}
