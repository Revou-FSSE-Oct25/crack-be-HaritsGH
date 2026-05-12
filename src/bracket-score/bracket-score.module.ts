import { Module } from '@nestjs/common';
import { BracketScoreService } from './bracket-score.service';
import { BracketScoreController } from './bracket-score.controller';
import { BracketScoreRepository } from './bracket-score.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BracketScoreController],
  providers: [BracketScoreService, BracketScoreRepository, PrismaService],
})
export class BracketScoreModule {}
