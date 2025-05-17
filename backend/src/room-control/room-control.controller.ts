import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RoomControlService } from './room-control.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('room-control')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoomControlController {
  constructor(private roomControlService: RoomControlService) {}

  @Get(':roomId')
  async getRoomState(@Param('roomId') roomId: string) {
    return this.roomControlService.getRoomState(roomId);
  }

  @Put(':roomId/lighting')
  async updateLightingState(
    @Param('roomId') roomId: string,
    @Body() lightingState: any,
    @Request() req: any,
  ) {
    return this.roomControlService.updateLightingState(roomId, lightingState);
  }

  @Put(':roomId/climate')
  async updateClimateState(
    @Param('roomId') roomId: string,
    @Body() climateState: any,
    @Request() req: any,
  ) {
    return this.roomControlService.updateClimateState(roomId, climateState);
  }

  @Put(':roomId/curtains')
  async updateCurtainState(
    @Param('roomId') roomId: string,
    @Body() curtainState: any,
    @Request() req: any,
  ) {
    return this.roomControlService.updateCurtainState(roomId, curtainState);
  }

  @Put(':roomId/dnd')
  async toggleDND(
    @Param('roomId') roomId: string,
    @Body() { dndActive }: { dndActive: boolean },
    @Request() req: any,
  ) {
    return this.roomControlService.toggleDND(roomId, dndActive);
  }
}
