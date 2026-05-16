import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './wishlists.entity';
import { FindManyOptions, FindOptionsWhere, In, Repository } from 'typeorm';
import { Wish } from 'src/wishes/wishes.entity';
import { throwNotFoundException } from 'src/shared';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(
    data: Partial<Wishlist> & { itemsId?: number[] },
  ): Promise<Wishlist> {
    const { itemsId, ...rest } = data;
    const wishlist = this.wishlistRepository.create(rest);

    if (itemsId && itemsId.length) {
      const items = await this.wishRepository.findBy({ id: In(itemsId) });
      wishlist.items = items;
    }

    return await this.wishlistRepository.save(wishlist);
  }

  async findOne(where: FindOptionsWhere<Wishlist>): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where,
      relations: ['items', 'owner'],
    });

    if (!wishlist) {
      throwNotFoundException('WISHLIST');
    }

    return wishlist;
  }

  async findMany(
    where: FindOptionsWhere<Wishlist>,
    options?: FindManyOptions<Wishlist>,
  ): Promise<Wishlist[]> {
    const wishlists = await this.wishlistRepository.find({
      where,
      order: options?.order,
      skip: options?.skip,
      take: options?.take,
      relations: ['items', 'owner'],
    });

    if (!wishlists) {
      throwNotFoundException('WISHLIST');
    }

    return wishlists;
  }

  async updateOne(
    where: FindOptionsWhere<Wishlist>,
    data: Partial<Wishlist> & { itemsId?: number[] },
  ): Promise<Wishlist> {
    const wishlist = await this.findOne(where);

    const { itemsId, ...rest } = data;

    Object.assign(wishlist, rest);

    if (itemsId) {
      const items = await this.wishRepository.findBy({ id: In(itemsId) });
      wishlist.items = items;
    }

    return await this.wishlistRepository.save(wishlist);
  }

  async removeOne(where: FindOptionsWhere<Wishlist>): Promise<Wishlist> {
    const wishlist = await this.findOne(where);
    return await this.wishlistRepository.remove(wishlist);
  }
}
