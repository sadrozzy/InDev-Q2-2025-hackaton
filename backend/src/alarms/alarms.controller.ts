import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('alarms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AlarmsController {
  constructor(private alarmsService: AlarmsService) {}

  @Post()
  async create(@Body() createAlarmDto: any, @Request() req: any) {
    return this.alarmsService.create({
      ...createAlarmDto,
      userId: req.user.id,
    });
  }

  @Get()
  @Roles('admin', 'hotel_staff')
  async findAll() {
    return this.alarmsService.findAll();
  }

  @Get('my')
  async findMyAlarms(@Request() req: any) {
    return this.alarmsService.findByUserId(req.user.id);
  }

  @Get('room/:roomId')
  @Roles('admin', 'hotel_staff')
  async findByRoomId(@Param('roomId') roomId: string) {
    return this.alarmsService.findByRoomId(roomId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.alarmsService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAlarmDto: any) {
    return this.alarmsService.update(id, updateAlarmDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.alarmsService.delete(id);
  }

  @Put(':id/toggle')
  async toggleActive(
    @Param('id') id: string,
    @Body() { isActive }: { isActive: boolean },
  ) {
    return this.alarmsService.toggleActive(id, isActive);
  }
}
