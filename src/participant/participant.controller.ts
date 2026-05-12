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

  @Post()
  addParticipant(@Body() createParticipantDto: CreateParticipantDto, @Request() req: any) {
    return this.participantService.addParticipant(createParticipantDto, req.user.userId);
  }

  @Get('tournament/:tourid')
  findTournament(@Param('tourid') tourid: number) {
    return this.participantService.findTournament(tourid);
  }

  @Get('user/:userid')
  findUser(@Param('userid') userid: number) {
    return this.participantService.findUser(userid);
  }

  @Patch()
  updateParticipation(@Query('tourid') tourid: number, @Body() updateParticipantDto: UpdateParticipantDto, @Request() req: any) {
    // Only allowed if the tournament has not started yet
    return this.participantService.updateParticipation(tourid, req.user.userId, updateParticipantDto);
  }

  @Delete()
  cancelParticipation(@Query('tourid') tourid: number, @Request() req: any) {
    // Only allowed if the tournament has not started yet
    return this.participantService.removeParticipation(tourid, req.user.userId);
  }
}
