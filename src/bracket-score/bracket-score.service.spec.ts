import { Test, TestingModule } from '@nestjs/testing';
import { BracketScoreService } from './bracket-score.service';

describe('BracketScoreService', () => {
  let service: BracketScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BracketScoreService],
    }).compile();

    service = module.get<BracketScoreService>(BracketScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
