import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('rooms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post('types')
  @Roles('admin', 'hotel_staff')
  async createRoomType(@Body() createRoomTypeDto: any) {
    return this.roomsService.createRoomType(createRoomTypeDto);
  }

  @Post()
  @Roles('admin', 'hotel_staff')
  async createRoom(@Body() createRoomDto: any) {
    return this.roomsService.createRoom(createRoomDto);
  }

  @Get()
  async findAllRooms() {
    return this.roomsService.findAllRooms();
  }

  @Get('types')
  async findAllRoomTypes() {
    return this.roomsService.findAllRoomTypes();
  }

  @Get(':id')
  async findRoomById(@Param('id') id: string) {
    return this.roomsService.findRoomById(id);
  }

  @Get('types/:id')
  async findRoomTypeById(@Param('id') id: string) {
    return this.roomsService.findRoomTypeById(id);
  }

  @Put(':id')
  @Roles('admin', 'hotel_staff')
  async updateRoom(@Param('id') id: string, @Body() updateRoomDto: any) {
    return this.roomsService.updateRoom(id, updateRoomDto);
  }

  @Put('types/:id')
  @Roles('admin', 'hotel_staff')
  async updateRoomType(
    @Param('id') id: string,
    @Body() updateRoomTypeDto: any,
  ) {
    return this.roomsService.updateRoomType(id, updateRoomTypeDto);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteRoom(@Param('id') id: string) {
    return this.roomsService.deleteRoom(id);
  }

  @Delete('types/:id')
  @Roles('admin')
  async deleteRoomType(@Param('id') id: string) {
    return this.roomsService.deleteRoomType(id);
  }
}
