import { IsOptional, IsString } from "class-validator";

export class CreateParticipantDto {
  @IsString()
  alias: string;

  @IsString()
  @IsOptional()
  prefix?: string;
}
