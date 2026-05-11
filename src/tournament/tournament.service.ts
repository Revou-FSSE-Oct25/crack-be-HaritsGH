import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { TournamentRepository } from './tournament.repository';

@Injectable()
export class TournamentService {
  constructor(private readonly tournamentRepository: TournamentRepository) {}
  create(req: CreateTournamentDto) {

    return this.tournamentRepository.create(req);
  }

  findAll(pagination: number = 1) {
    return this.tournamentRepository.findAll(pagination);
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
