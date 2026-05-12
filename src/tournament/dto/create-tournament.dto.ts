export class CreateTournamentDto {
  name: string;
  game: string;
  startDate?: Date;
  endDate?: Date; // Optional - will be set in service
}