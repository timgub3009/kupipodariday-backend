import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { throwNotFoundException } from 'src/shared/helpers';
import { HashService } from 'src/hash/hash.service';
import { Ru } from 'src/shared';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const userByEmail = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (userByEmail) {
      throw new ConflictException(Ru.EMAIL_ALREADY_EXISTS);
    }

    const userByName = await this.userRepository.findOne({
      where: {
        username: data.username,
      },
    });

    if (userByName) {
      throw new ConflictException(Ru.USERNAME_ALREADY_EXISTS);
    }

    if (data.password) {
      data.password = await this.hashService.hash(data.password);
    }

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

    if (data.password) {
      data.password = await this.hashService.hash(data.password);
    }

    Object.assign(user, data);

    return await this.userRepository.save(user);
  }

  async removeOne(where: FindOptionsWhere<User>): Promise<User> {
    const user = await this.findOne(where);
    return await this.userRepository.remove(user);
  }

  async getUserByName(username: string): Promise<User> | null {
    const user = await this.userRepository.findOne({
      where: { username },
      select: [
        'id',
        'username',
        'email',
        'password',
        'about',
        'avatar',
        'createdAt',
        'updatedAt',
      ],
    });
    return user;
  }
}
