import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient, Room, RoomType, RoomStatus } from '@prisma/client';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async createRoomType(data: {
    name: string;
    description?: string;
    capacity: number;
    basePricePerNight: number;
    amenities?: any;
  }): Promise<RoomType> {
    return this.prisma.roomType.create({
      data,
    });
  }

  async create(data: {
    roomTypeId: string;
    roomNumber: string;
    status?: RoomStatus;
    bleDoorDeviceId?: string;
    bleLightingSystemId?: string;
    bleClimateControlId?: string;
    bleCurtainControlId?: string;
    currentScenarioName?: string;
    notes?: string;
  }) {
    return this.prisma.room.create({
      data: {
        roomNumber: data.roomNumber,
        status: (data.status as RoomStatus) || 'available',
        bleDoorDeviceId: data.bleDoorDeviceId,
        bleLightingSystemId: data.bleLightingSystemId,
        bleClimateControlId: data.bleClimateControlId,
        bleCurtainControlId: data.bleCurtainControlId,
        currentScenario: data.currentScenarioName
          ? {
              connect: {
                scenarioName: data.currentScenarioName,
              },
            }
          : undefined,
        notes: data.notes,
        roomType: {
          connect: {
            id: data.roomTypeId,
          },
        },
      },
    });
  }

  async createRoom(data: {
    roomTypeId: string;
    roomNumber: string;
    status?: RoomStatus;
    bleDoorDeviceId?: string;
    bleLightingSystemId?: string;
    bleClimateControlId?: string;
    bleCurtainControlId?: string;
    currentScenarioName?: string;
    notes?: string;
  }): Promise<Room> {
    return this.prisma.room.create({
      data: {
        roomNumber: data.roomNumber,
        status: (data.status as RoomStatus) || 'available',
        bleDoorDeviceId: data.bleDoorDeviceId,
        bleLightingSystemId: data.bleLightingSystemId,
        bleClimateControlId: data.bleClimateControlId,
        bleCurtainControlId: data.bleCurtainControlId,
        currentScenario: data.currentScenarioName
          ? {
              connect: {
                scenarioName: data.currentScenarioName,
              },
            }
          : undefined,
        notes: data.notes,
        roomType: {
          connect: {
            id: data.roomTypeId,
          },
        },
      },
    });
  }

  async findAllRooms(): Promise<Room[]> {
    return this.prisma.room.findMany({
      include: {
        roomType: true,
        controlState: true,
      },
    });
  }

  async findAllRoomTypes(): Promise<RoomType[]> {
    return this.prisma.roomType.findMany();
  }

  async findRoomById(id: string): Promise<Room> {
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: {
        roomType: true,
        controlState: true,
      },
    });
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  async findRoomTypeById(id: string): Promise<RoomType> {
    const roomType = await this.prisma.roomType.findUnique({
      where: { id },
    });
    if (!roomType) {
      throw new NotFoundException(`Room type with ID ${id} not found`);
    }
    return roomType;
  }

  async updateRoom(id: string, data: Partial<Room>): Promise<Room> {
    try {
      return await this.prisma.room.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
  }

  async updateRoomType(id: string, data: Partial<RoomType>): Promise<RoomType> {
    try {
      return await this.prisma.roomType.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Room type with ID ${id} not found`);
    }
  }

  async deleteRoom(id: string): Promise<Room> {
    try {
      return await this.prisma.room.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
  }

  async deleteRoomType(id: string): Promise<RoomType> {
    try {
      return await this.prisma.roomType.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Room type with ID ${id} not found`);
    }
  }
}
