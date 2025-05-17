import { Module } from '@nestjs/common';
import { RoomControlService } from './room-control.service';
import { RoomControlController } from './room-control.controller';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [RoomsModule],
  providers: [RoomControlService],
  controllers: [RoomControlController],
  exports: [RoomControlService],
})
export class RoomControlModule {}
