import { Module } from '@nestjs/common';
import { BracketScoreService } from './bracket-score.service';
import { BracketScoreController } from './bracket-score.controller';

@Module({
  controllers: [BracketScoreController],
  providers: [BracketScoreService],
})
export class BracketScoreModule {}
