import { Injectable } from '@nestjs/common';
import { CreateBracketScoreDto } from './dto/create-bracket-score.dto';
import { UpdateBracketScoreDto } from './dto/update-bracket-score.dto';

@Injectable()
export class BracketScoreService {
  create(createBracketScoreDto: CreateBracketScoreDto) {
    return 'This action adds a new bracketScore';
  }

  findAll() {
    return `This action returns all bracketScore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bracketScore`;
  }

  update(id: number, updateBracketScoreDto: UpdateBracketScoreDto) {
    return `This action updates a #${id} bracketScore`;
  }

  remove(id: number) {
    return `This action removes a #${id} bracketScore`;
  }
}
