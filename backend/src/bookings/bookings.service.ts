import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Booking, BookingStatus } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    userId: string;
    roomId: string;
    checkInDateTime: Date;
    checkOutDateTime: Date;
    status?: BookingStatus;
    totalPrice: number;
    specialRequests?: string;
  }) {
    // Проверяем доступность номера
    const room = await this.prisma.room.findUnique({
      where: { id: data.roomId },
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${data.roomId} not found`);
    }

    if (room.status !== 'available') {
      throw new BadRequestException('Room is not available for booking');
    }

    // Проверяем пересечение с существующими бронированиями
    const conflictingBooking = await this.prisma.booking.findFirst({
      where: {
        roomId: data.roomId,
        OR: [
          {
            AND: [
              { checkInDateTime: { lte: data.checkInDateTime } },
              { checkOutDateTime: { gt: data.checkInDateTime } },
            ],
          },
          {
            AND: [
              { checkInDateTime: { lt: data.checkOutDateTime } },
              { checkOutDateTime: { gte: data.checkOutDateTime } },
            ],
          },
        ],
      },
    });

    if (conflictingBooking) {
      throw new BadRequestException('Room is already booked for these dates');
    }

    return this.prisma.booking.create({
      data: {
        checkInDateTime: data.checkInDateTime,
        checkOutDateTime: data.checkOutDateTime,
        status: (data.status as BookingStatus) || 'confirmed',
        totalPrice: data.totalPrice,
        specialRequests: data.specialRequests,
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
      },
    });
  }

  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        user: true,
        room: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: {
        user: true,
        room: true,
      },
    });
  }

  async findByUserId(userId: string): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        room: {
          include: {
            roomType: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Partial<Booking>): Promise<Booking> {
    try {
      return await this.prisma.booking.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
  }

  async delete(id: string): Promise<Booking> {
    try {
      return await this.prisma.booking.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
  }

  async checkIn(id: string): Promise<Booking> {
    const booking = await this.findById(id);
    if (booking.status !== 'confirmed') {
      throw new BadRequestException(
        'Booking must be confirmed before check-in',
      );
    }
    return this.update(id, { status: 'checked_in' });
  }

  async checkOut(id: string): Promise<Booking> {
    const booking = await this.findById(id);
    if (booking.status !== 'checked_in') {
      throw new BadRequestException(
        'Booking must be checked in before check-out',
      );
    }
    return this.update(id, { status: 'checked_out' });
  }

  async cancel(id: string): Promise<Booking> {
    const booking = await this.findById(id);
    if (booking.status === 'checked_out' || booking.status === 'cancelled') {
      throw new BadRequestException(
        'Cannot cancel a booking that is already checked out or cancelled',
      );
    }
    return this.update(id, { status: 'cancelled' });
  }
}
