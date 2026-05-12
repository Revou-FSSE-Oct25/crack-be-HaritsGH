import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TournamentRepository } from './tournament.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TournamentController],
  providers: [TournamentService, TournamentRepository, PrismaService],
})
export class TournamentModule {}
