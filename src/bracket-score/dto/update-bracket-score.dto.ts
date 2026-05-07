import { PartialType } from '@nestjs/mapped-types';
import { CreateBracketScoreDto } from './create-bracket-score.dto';

export class UpdateBracketScoreDto extends PartialType(CreateBracketScoreDto) {}
