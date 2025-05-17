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
import { GuestAccessService } from './guest-access.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('guest-access')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GuestAccessController {
  constructor(private guestAccessService: GuestAccessService) {}

  @Post()
  async create(@Body() createPermissionDto: any, @Request() req: any) {
    return this.guestAccessService.create({
      ...createPermissionDto,
      primaryGuestUserId: req.user.id,
    });
  }

  @Get()
  @Roles('admin', 'hotel_staff')
  async findAll() {
    return this.guestAccessService.findAll();
  }

  @Get('my-shared')
  async findMySharedPermissions(@Request() req: any) {
    return this.guestAccessService.findBySharedWithId(req.user.id);
  }

  @Get('my-given')
  async findMyGivenPermissions(@Request() req: any) {
    return this.guestAccessService.findByPrimaryGuestId(req.user.id);
  }

  @Get('room/:roomId')
  @Roles('admin', 'hotel_staff')
  async findByRoomId(@Param('roomId') roomId: string) {
    return this.guestAccessService.findByRoomId(roomId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.guestAccessService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePermissionDto: any) {
    return this.guestAccessService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.guestAccessService.delete(id);
  }

  @Put(':id/toggle')
  async toggleActive(
    @Param('id') id: string,
    @Body() { isActive }: { isActive: boolean },
  ) {
    return this.guestAccessService.toggleActive(id, isActive);
  }
}
