import { Injectable } from "@nestjs/common";
import { CreateTournamentDto } from "./dto/create-tournament.dto";
import { UpdateTournamentDto } from "./dto/update-tournament.dto";

type Tournament = {
  id: number;
  name: string;
  game: string;
  date: Date;
  admins: string[];
  participants: string[];
  rounds: TournamentRound[];
}

export type TournamentRound = {
  id: number;
  playerA: string;
  playerB: string;
  scoreA: number;
  scoreB: number;
  winner: number;
}

@Injectable()
export class TournamentRepository{
  private tourList: Tournament[] = []
  
  create(req: CreateTournamentDto) {
    this.tourList.push({
      id: this.tourList.length + 1,
      name: req.name,
      game: req.game,
      date: req.date,
      admins: req.admins,
      participants: [],
      rounds: []
    })
    return this.tourList[this.tourList.length - 1]
  }

  findAll(pagination: number) {
    const limit = 20;
    const startIndex = (pagination - 1) * limit;
    const endIndex = startIndex + limit;
    return this.tourList.slice(startIndex, endIndex)
  }

  findOne(id: number) {
    return this.tourList.find((turni) => turni.id === id)
  }

  update(id: number, req: UpdateTournamentDto) {
    const turni = this.tourList.find((turni) => turni.id === id)
    if (turni) {
      turni.name = req.name;
      turni.game = req.game;
      turni.date = req.date;
      turni.admins = req.admins;
      turni.participants = req.participants;
      turni.rounds = req.rounds
    }
    return this.tourList.find((turni) => turni.id === id);
  }

  remove(id: number) {
    const turni = this.tourList.find((turni) => turni.id === id)
    if (turni) {
      this.tourList.splice(this.tourList.indexOf(turni, 1))
    }
    return this.tourList.find((turni) => turni.id === id);
  }
}