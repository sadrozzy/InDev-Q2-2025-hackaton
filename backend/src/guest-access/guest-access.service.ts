import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GuestAccessPermission } from '@prisma/client';

@Injectable()
export class GuestAccessService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    bookingId: string;
    primaryGuestUserId: string;
    sharedWithUserId?: string;
    sharedWithEmailOrPhone?: string;
    roomId: string;
    accessStartTime: Date;
    accessEndTime: Date;
    bleTemporaryKeyInfo?: any;
    isActive?: boolean;
  }): Promise<GuestAccessPermission> {
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
    if (booking.userId !== data.primaryGuestUserId) {
      throw new BadRequestException('User is not the owner of this booking');
    }

    // Проверяем, что время доступа находится в пределах бронирования
    if (
      data.accessStartTime < booking.checkInDateTime ||
      data.accessEndTime > booking.checkOutDateTime
    ) {
      throw new BadRequestException(
        'Access time must be within booking period',
      );
    }

    return this.prisma.guestAccessPermission.create({
      data,
    });
  }

  async findAll(): Promise<GuestAccessPermission[]> {
    return this.prisma.guestAccessPermission.findMany({
      include: {
        booking: true,
        primaryGuestUser: true,
        sharedWithUser: true,
        room: true,
      },
    });
  }

  async findById(id: string): Promise<GuestAccessPermission> {
    const permission = await this.prisma.guestAccessPermission.findUnique({
      where: { id },
      include: {
        booking: true,
        primaryGuestUser: true,
        sharedWithUser: true,
        room: true,
      },
    });

    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }

    return permission;
  }

  async findByPrimaryGuestId(userId: string): Promise<GuestAccessPermission[]> {
    return this.prisma.guestAccessPermission.findMany({
      where: { primaryGuestUserId: userId },
      include: {
        booking: true,
        sharedWithUser: true,
        room: true,
      },
    });
  }

  async findBySharedWithId(userId: string): Promise<GuestAccessPermission[]> {
    return this.prisma.guestAccessPermission.findMany({
      where: { sharedWithUserId: userId },
      include: {
        booking: true,
        primaryGuestUser: true,
        room: true,
      },
    });
  }

  async findByRoomId(roomId: string): Promise<GuestAccessPermission[]> {
    return this.prisma.guestAccessPermission.findMany({
      where: { roomId },
      include: {
        booking: true,
        primaryGuestUser: true,
        sharedWithUser: true,
      },
    });
  }

  async update(
    id: string,
    data: Partial<GuestAccessPermission>,
  ): Promise<GuestAccessPermission> {
    try {
      return await this.prisma.guestAccessPermission.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
  }

  async delete(id: string): Promise<GuestAccessPermission> {
    try {
      return await this.prisma.guestAccessPermission.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
  }

  async toggleActive(
    id: string,
    isActive: boolean,
  ): Promise<GuestAccessPermission> {
    return this.update(id, { isActive });
  }
}
