import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { ParticipantRepository } from './participant.repository';
import { PrismaService } from '../prisma.service';
import { TournamentRepository } from 'src/tournament/tournament.repository';

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService, ParticipantRepository, PrismaService, TournamentRepository],
})
export class ParticipantModule {}
