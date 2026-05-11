import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentDto } from './create-tournament.dto';
import { TournamentRound } from '../tournament.repository';

export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {
  participants: string[];
  rounds: TournamentRound[]
}
