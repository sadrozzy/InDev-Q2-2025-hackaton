import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Alarm, MusicServiceOptions } from '@prisma/client';

@Injectable()
export class AlarmsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    bookingId: string;
    userId: string;
    roomId: string;
    alarmTime: Date;
    daysOfWeek: string[];
    isActive?: boolean;
    label?: string;
    musicService?: MusicServiceOptions;
    musicResourceUri?: string;
    linkedScenarioName?: string;
  }) {
    // Проверяем существование бронирования
    const booking = await this.prisma.booking.findUnique({
      where: { id: data.bookingId },
    });

    if (!booking) {
      throw new NotFoundException(
        `Booking with ID ${data.bookingId} not found`,
      );
    }

    // Проверяем, что пользователь является владельцем бронирования
    if (booking.userId !== data.userId) {
      throw new BadRequestException('User is not the owner of this booking');
    }

    return this.prisma.alarm.create({
      data: {
        alarmTime: data.alarmTime,
        daysOfWeek: data.daysOfWeek,
        isActive: data.isActive,
        label: data.label,
        musicService: data.musicService as MusicServiceOptions,
        musicResourceUri: data.musicResourceUri,
        booking: {
          connect: {
            id: data.bookingId,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
        room: {
          connect: {
            id: data.roomId,
          },
        },
        linkedScenario: data.linkedScenarioName
          ? {
              connect: {
                scenarioName: data.linkedScenarioName,
              },
            }
          : undefined,
      },
    });
  }

  async findAll(): Promise<Alarm[]> {
    return this.prisma.alarm.findMany({
      include: {
        booking: true,
        user: true,
        room: true,
        linkedScenario: true,
      },
    });
  }

  async findById(id: string): Promise<Alarm> {
    const alarm = await this.prisma.alarm.findUnique({
      where: { id },
      include: {
        booking: true,
        user: true,
        room: true,
        linkedScenario: true,
      },
    });

    if (!alarm) {
      throw new NotFoundException(`Alarm with ID ${id} not found`);
    }

    return alarm;
  }

  async findByUserId(userId: string): Promise<Alarm[]> {
    return this.prisma.alarm.findMany({
      where: { userId },
      include: {
        booking: true,
        room: true,
        linkedScenario: true,
      },
    });
  }

  async findByRoomId(roomId: string): Promise<Alarm[]> {
    return this.prisma.alarm.findMany({
      where: { roomId },
      include: {
        booking: true,
        user: true,
        linkedScenario: true,
      },
    });
  }

  async update(id: string, data: Partial<Alarm>): Promise<Alarm> {
    try {
      return await this.prisma.alarm.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Alarm with ID ${id} not found`);
    }
  }

  async delete(id: string): Promise<Alarm> {
    try {
      return await this.prisma.alarm.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Alarm with ID ${id} not found`);
    }
  }

  async toggleActive(id: string, isActive: boolean): Promise<Alarm> {
    return this.update(id, { isActive });
  }
}
