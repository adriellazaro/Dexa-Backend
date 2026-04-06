import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Attendance } from 'src/attendance/attendance.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  password: string;

  @OneToMany(() => Attendance, attendance => attendance.user)
  attendances: Attendance[];
}