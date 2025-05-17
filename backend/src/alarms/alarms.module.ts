import { Module } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from './alarms.controller';
import { BookingsModule } from '../bookings/bookings.module';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [BookingsModule, RoomsModule],
  providers: [AlarmsService],
  controllers: [AlarmsController],
  exports: [AlarmsService],
})
export class AlarmsModule {}
