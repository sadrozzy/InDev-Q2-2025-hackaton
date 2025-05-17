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
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  async create(@Body() createBookingDto: any, @Request() req: any) {
    return this.bookingsService.create({
      ...createBookingDto,
      userId: req.user.id,
    });
  }

  @Get()
  @Roles('admin', 'hotel_staff')
  async findAll() {
    return this.bookingsService.findAll();
  }

  @Get('my')
  async findMyBookings(@Request() req: any) {
    return this.bookingsService.findByUserId(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookingsService.findById(id);
  }

  @Put(':id')
  @Roles('admin', 'hotel_staff')
  async update(@Param('id') id: string, @Body() updateBookingDto: any) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) {
    return this.bookingsService.delete(id);
  }

  @Put(':id/check-in')
  @Roles('admin', 'hotel_staff')
  async checkIn(@Param('id') id: string) {
    return this.bookingsService.checkIn(id);
  }

  @Put(':id/check-out')
  @Roles('admin', 'hotel_staff')
  async checkOut(@Param('id') id: string) {
    return this.bookingsService.checkOut(id);
  }

  @Put(':id/cancel')
  async cancel(@Param('id') id: string) {
    return this.bookingsService.cancel(id);
  }
}
