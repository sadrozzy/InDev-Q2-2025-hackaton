import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomControlService {
  constructor(private prisma: PrismaService) {}

  async getRoomState(roomId: string) {
    return this.prisma.roomControlState.findUnique({
      where: { roomId },
      include: {
        room: true,
        lastChangedByUser: true,
      },
    });
  }

  async updateLightingState(roomId: string, lightingState: any) {
    return this.prisma.roomControlState.upsert({
      where: { roomId },
      update: {
        lightingState,
        lastUpdatedAt: new Date(),
      },
      create: {
        roomId,
        lightingState,
      },
    });
  }

  async updateClimateState(roomId: string, climateState: any) {
    return this.prisma.roomControlState.upsert({
      where: { roomId },
      update: {
        climateState,
        lastUpdatedAt: new Date(),
      },
      create: {
        roomId,
        climateState,
      },
    });
  }

  async updateCurtainState(roomId: string, curtainState: any) {
    return this.prisma.roomControlState.upsert({
      where: { roomId },
      update: {
        curtainState,
        lastUpdatedAt: new Date(),
      },
      create: {
        roomId,
        curtainState,
      },
    });
  }

  async toggleDND(roomId: string, dndActive: boolean) {
    return this.prisma.roomControlState.upsert({
      where: { roomId },
      update: {
        dndActive,
        lastUpdatedAt: new Date(),
      },
      create: {
        roomId,
        dndActive,
      },
    });
  }
}
