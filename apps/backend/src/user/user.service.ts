import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}

  async findByEmail(email: string): Promise<Users> {
    const user = await this.userRepo
      .findOneOrFail({ where: { email } })
      .catch(() => {
        throw new NotFoundException('User does not exist.');
      });
    return user;
  }

  async findById(userId: string): Promise<Users> {
    const user = this.userRepo
      .findOneOrFail({ where: { id: userId } })
      .catch(() => {
        throw new NotFoundException('User does not exist.');
      });
    return user;
  }
}
