import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import {
  FindManyOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { throwNotFoundException } from 'src/shared/helpers';

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
      throwNotFoundException('USER');
    }

    return user;
  }

  async findMany(
    where: FindOptionsWhere<User>,
    options: FindManyOptions<User>,
  ): Promise<User[]> {
    const users = await this.userRepository.find({
      where,
      skip: options?.skip,
      order: options?.order,
      take: options?.take,
    });

    if (!users) {
      throwNotFoundException('USER');
    }

    return users;
  }

  async updateOne(
    where: FindOptionsWhere<User>,
    data: Partial<User>,
  ): Promise<User> {
    const user = await this.findOne(where);

    Object.assign(user, data);

    return await this.userRepository.save(user);
  }

  async removeOne(where: FindOptionsWhere<User>): Promise<User> {
    const user = await this.findOne(where);
    return await this.userRepository.remove(user);
  }
}
