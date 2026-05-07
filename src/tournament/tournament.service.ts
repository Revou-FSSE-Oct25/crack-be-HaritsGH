import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { TournamentRepository } from './tournament.repository';

@Injectable()
export class TournamentService {
  constructor(private readonly tournamentRepository: TournamentRepository) {}
  create(createTournamentDto: CreateTournamentDto) {

    return this.tournamentRepository.create();
  }

  findAll() {
    return this.tournamentRepository.findAll();
  }

  findOne(id: number) {
    return this.tournamentRepository.findOne(id);
  }

  update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentRepository.update(id, updateTournamentDto);
  }

  remove(id: number) {
    return this.tournamentRepository.remove(id);
  }
}
