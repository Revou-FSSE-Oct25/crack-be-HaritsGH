import { Module } from '@nestjs/common';
import { BracketScoreService } from './bracket-score.service';
import { BracketScoreController } from './bracket-score.controller';
import { BracketScoreRepository } from './bracket-score.repository';

@Module({
  controllers: [BracketScoreController],
  providers: [BracketScoreService, BracketScoreRepository],
})
export class BracketScoreModule {}
