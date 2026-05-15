import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentDto } from './create-tournament.dto';

export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {
  @IsString()
  @IsOptional()
  status?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  admins?: number[];

  @IsString()
  @IsOptional()
  utc?: string;
}
