import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './wishes.entity';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Ru, throwNotFoundException } from 'src/shared';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(data: Wish): Promise<Wish> {
    const wish = this.wishRepository.create(data);
    return await this.wishRepository.save(wish);
  }

  async findOne(where: FindOptionsWhere<Wish>): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where,
      relations: ['owner', 'offers'],
    });

    if (!wish) {
      throwNotFoundException('WISH');
    }

    return wish;
  }

  async findMany(
    where: FindOptionsWhere<Wish>,
    options?: FindManyOptions<Wish>,
  ): Promise<Wish[]> {
    const wishes = await this.wishRepository.find({
      where,
      order: options?.order,
      take: options?.take,
      skip: options?.skip,
      relations: ['owner'],
    });

    if (!wishes) {
      throwNotFoundException('WISH');
    }

    return wishes;
  }

  async updateOne(
    where: FindOptionsWhere<Wish>,
    data: Partial<Wish>,
  ): Promise<Wish> {
    const wish = await this.findOne(where);

    if (wish.raised > 0) {
      throw new ForbiddenException(Ru.WISH_EDIT_DISABLED);
    }

    Object.assign(wish, data);

    return await this.wishRepository.save(wish);
  }

  async removeOne(where: FindOptionsWhere<Wish>): Promise<Wish> {
    const wish = await this.findOne(where);
    return await this.wishRepository.remove(wish);
  }
}
