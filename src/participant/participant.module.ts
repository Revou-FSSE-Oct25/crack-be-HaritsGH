import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { ParticipantRepository } from './participant.repository';

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService, ParticipantRepository],
})
export class ParticipantModule {}
