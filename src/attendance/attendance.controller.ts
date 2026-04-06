import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
// import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { UnauthorizedException } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@UseGuards(JwtAuthGuard)
@Controller('attendance')
export class AttendanceController {
    constructor(private attendanceService: AttendanceService) {}

    @Post('check-in')
    checkIn(@Req() req) {
        return this.attendanceService.checkIn(req.user.userId);
    }

    @Post('check-out')
    checkOut(@Req() req) {
        return this.attendanceService.checkOut(req.user.userId);
    }

    @Get()
    getAttendances(@Req() req, @Query('from') from: string, @Query('to') to: string) {
        return this.attendanceService.getAttendances(req.user.userId, from, to);
    }

    @Get('all')
    getAllAttendances(@Req() req, @Query('from') from: string, @Query('to') to: string) {
        console.log(req.user); // harus relog kalau ubah position
        if(req.user.position !== 'admin') {
            throw new UnauthorizedException('Only admins can access this endpoint');
        }
        return this.attendanceService.getAllAttendances(from, to);
    }
}

