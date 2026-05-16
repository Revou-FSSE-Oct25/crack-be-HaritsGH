import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TournamentRepository } from './tournament.repository';
import { PrismaService } from '../prisma.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  controllers: [TournamentController],
  providers: [TournamentService, TournamentRepository, UserRepository, PrismaService],
})
export class TournamentModule {}
