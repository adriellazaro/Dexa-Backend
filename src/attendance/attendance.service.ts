import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttendanceService {
    constructor(  
        @InjectRepository(Attendance)
        private attendanceRepository: Repository<Attendance>,
) {}

    async checkIn(userId: number) {
        const existing = await this.attendanceRepository
            .createQueryBuilder('att')
            .where('att.userId = :userId', { userId })
            .andWhere('DATE(att.checkIn) = CURRENT_DATE')
            .getOne();

        if (existing) {
            throw new Error('Already checked in today');
        }

        const attendance = this.attendanceRepository.create({
            checkIn: new Date(),
            user: { id: userId },
        });

        return this.attendanceRepository.save(attendance);
    }

    async checkOut(userId: number) {
        const attendance = await this.attendanceRepository
            .createQueryBuilder('att')
            .where('att.userId = :userId', { userId })
            .andWhere('DATE(att.checkIn) = CURRENT_DATE')
            .getOne();

        if (!attendance) {
            throw new Error('No active check-in found');
        }

        if(attendance.checkOut) {
            throw new Error('Already checked out today');
        }

        attendance.checkOut = new Date();
        return this.attendanceRepository.save(attendance);
    }

    async getAttendances(userId: number, from?: string, to?: string) {
        const query = this.attendanceRepository
            .createQueryBuilder('att')
            .where('att.userId = :userId', { userId });

        if (!from && !to) {
            // default awal bulan - hari ini
            query.andWhere("att.checkIn >= date_trunc('month', CURRENT_DATE)");
        } else if (from && !to) {
            query.andWhere('DATE(att.checkIn) >= :from', { from });
        } else if (!from && to) {
            query.andWhere('DATE(att.checkIn) <= :to', { to });
        } else {
            query.andWhere('DATE(att.checkIn) BETWEEN :from AND :to', {
            from,
            to,
            });
        }

        return query
            .orderBy('att.checkIn', 'DESC')
            .getMany();
    }

    async getAllAttendances(from?: string, to?: string) {
        const query = this.attendanceRepository
            .createQueryBuilder('att')
            .leftJoinAndSelect('att.user', 'user');

        if (from) {
            query.andWhere('DATE(att.checkIn) >= :from', { from });
        }
        if (to) {
            query.andWhere('DATE(att.checkIn) <= :to', { to });
        }
        return query
            .orderBy('att.checkIn', 'DESC')
            .getMany();
    }
}
