import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { BookingsModule } from './bookings/bookings.module';
import { RoomControlModule } from './room-control/room-control.module';
import { AlarmsModule } from './alarms/alarms.module';
import { GuestAccessModule } from './guest-access/guest-access.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RoomsModule,
    BookingsModule,
    RoomControlModule,
    AlarmsModule,
    GuestAccessModule,
  ],
})
export class AppModule {}
