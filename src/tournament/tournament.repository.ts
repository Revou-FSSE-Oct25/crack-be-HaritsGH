import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateTournamentDto } from "./dto/create-tournament.dto";
import { UpdateTournamentDto } from "./dto/update-tournament.dto";

@Injectable()
export class TournamentRepository{
  constructor(private prisma: PrismaService) {}
  
  async createTourney(createTournamentDto: CreateTournamentDto, owner: number) {
    return await this.prisma.tournament.create({
      data: {
        ...createTournamentDto,
        owner,
        admins: [owner],
        status: 'Upcoming',
        startDate: createTournamentDto.startDate || new Date(Date.now()),
        endDate: createTournamentDto.endDate || new Date((createTournamentDto.startDate?.getTime() || Date.now()) + 24 * 60 * 60 * 1000),
      }
    });
  }

  async findAllTourney(pagination: number) {
    const limit = 20;
    const skip = (pagination - 1) * limit;
    return await this.prisma.tournament.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        game: true,
        startDate: true,
        status: true
        // Not including admins and participants for browsing page
      }
    });
  }

  async findOneTourney(tourid: number) {
    return await this.prisma.tournament.findUnique({
      where: { id: tourid },
    });
  }

  async updateTourney(tourid: number, updateTournamentDto: UpdateTournamentDto) {
    return await this.prisma.tournament.update({
      where: { id: tourid },
      data: updateTournamentDto
    });
  }

  async deleteTourney(tourid: number) {
    return await this.prisma.tournament.delete({
      where: { id: tourid }
    });
  }

  async updateTourneyAdmins(tourid: number, adminIds: number[]) {
    return await this.prisma.tournament.update({
      where: { id: tourid },
      data: { admins: adminIds }
    });
  }
}