import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  addParticipant(@Body() req: CreateParticipantDto) {
    return this.participantService.addParticipant(req);
  }

  @Get(':tourid')
  findTournament(@Param('tourid') tourid: number) {
    return this.participantService.findTournament(tourid);
  }

  @Get('user/:userid')
  findUser(@Param('userid') userid: string) {
    return this.participantService.findUser(userid);
  }

  @Patch(':tourid')
  updateParticipation(@Param('tourid') tourid: number, @Query('username') username: string, @Body() req: UpdateParticipantDto) {
    return this.participantService.updateParticipation(tourid, username, req);
  }

  @Delete(':tourid')
  cancelParticipation(@Param('tourid') tourid: number, @Query('username') username: string) {
    return this.participantService.removeParticipation(tourid, username);
  }
}
