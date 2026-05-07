import { Injectable } from "@nestjs/common";

type Tournament = {
  id: number;
  name: string;
  game: string;

}

@Injectable()
export class TournamentRepository{
  private tourList: Tournament[] = []
  

}