import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { ParticipantRepository } from './participant.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService, ParticipantRepository, PrismaService],
})
export class ParticipantModule {}
