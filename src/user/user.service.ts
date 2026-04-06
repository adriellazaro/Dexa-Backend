import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  create(data: Partial<User>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new Error('User not found');

    Object.assign(user, data);
    return this.repo.save(user);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }

  findOneByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async updateProfile(id: number, data: Partial<User>) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new Error('User not found');
    
    if (data.photo) user.photo = data.photo;
    if (data.phone) user.phone = data.phone;
    if (data.password) user.password = data.password;

    return this.repo.save(user);
  }
}