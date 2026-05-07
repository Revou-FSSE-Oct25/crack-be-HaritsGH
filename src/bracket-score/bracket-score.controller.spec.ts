import { Test, TestingModule } from '@nestjs/testing';
import { BracketScoreController } from './bracket-score.controller';
import { BracketScoreService } from './bracket-score.service';

describe('BracketScoreController', () => {
  let controller: BracketScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BracketScoreController],
      providers: [BracketScoreService],
    }).compile();

    controller = module.get<BracketScoreController>(BracketScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
