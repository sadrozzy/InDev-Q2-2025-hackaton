import { Module } from '@nestjs/common';
import { GuestAccessService } from './guest-access.service';
import { GuestAccessController } from './guest-access.controller';
import { BookingsModule } from '../bookings/bookings.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [BookingsModule, UsersModule],
  providers: [GuestAccessService],
  controllers: [GuestAccessController],
  exports: [GuestAccessService],
})
export class GuestAccessModule {}
