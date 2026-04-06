import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';

@Module({
  providers: [AttendanceService],
  controllers: [AttendanceController],
  imports: [TypeOrmModule.forFeature([Attendance])]
})
export class AttendanceModule {}
