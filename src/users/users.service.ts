import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: User): Promise<User> {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async findOne(where: FindOptionsWhere<User>): Promise<User> {
    const user = await this.userRepository.findOne({ where });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findMany(where: FindOptionsWhere<User>): Promise<User[]> {
    const users = await this.userRepository.find({ where });
    return users;
  }

  async updateOne(where: FindOptionsWhere<User>, data): Promise<User> {
    const user = await this.userRepository.findOne({ where });
    if (!user) {
      throw new NotFoundException();
    }
    return await this.userRepository.save(user);
  }
}
