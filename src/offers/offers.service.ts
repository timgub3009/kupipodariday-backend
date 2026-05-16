import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './offers.entity';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Ru, throwNotFoundException } from 'src/shared';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private wishService: WishesService,
  ) {}

  async create(data: Offer): Promise<Offer> {
    const { amount, id, user, hidden } = data;

    if (!amount || !id) {
      throw new BadRequestException(Ru.OFFER_REQUIRED_PARAMS_ABSENT);
    }

    const wish = await this.wishService.findOne({ id });

    if (!wish) {
      throwNotFoundException('WISH');
    }

    const restSum = wish.price - wish.raised;

    if (amount > restSum) {
      throw new BadRequestException(Ru.OFFER_AMOUNT_TOO_BIG);
    }

    const offer = this.offerRepository.create({
      amount,
      hidden: hidden ?? false,
      item: wish,
      user,
    });

    const savedOffer = await this.offerRepository.save(offer);

    wish.raised += amount;

    await this.wishService.updateOne({ id: wish.id }, { raised: wish.raised });

    return savedOffer;
  }

  async findOne(where: FindOptionsWhere<Offer>): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where,
      relations: ['user', 'item'],
    });

    if (!offer) {
      throwNotFoundException('OFFER');
    }

    return offer;
  }

  async findMany(
    where: FindOptionsWhere<Offer>,
    options?: FindManyOptions<Offer>,
  ): Promise<Offer[]> {
    const offers = await this.offerRepository.find({
      where,
      skip: options?.skip,
      take: options?.take,
      order: options?.order,
      relations: ['user', 'item'],
    });

    if (!offers) {
      throwNotFoundException('OFFER');
    }

    return offers;
  }

  async updateOne(
    where: FindOptionsWhere<Offer>,
    data: Partial<Offer>,
  ): Promise<Offer> {
    const offer = await this.findOne(where);

    Object.assign(offer, data);

    return await this.offerRepository.save(offer);
  }

  async removeOne(where: FindOptionsWhere<Offer>): Promise<Offer> {
    const offer = await this.findOne(where);
    return await this.offerRepository.remove(offer);
  }
}
