/**
 * Сущность описывает желаемый пользователем подарок со всеми ее связями.
 */

import { Offer } from 'src/offers/offers.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/** Подарок, который пользователь желает получить. */
@Entity()
export class Wish {
  /** Уникальный идентификатор. */
  @PrimaryGeneratedColumn()
  id: number;

  /** Название желаемого подарка. */
  @Column({ length: 250 })
  name: string;

  /** Ссылка на интернет-магазин, где можно приобрести подарок. */
  @Column()
  link: string;

  /** Ссылка на изображение подарка. */
  @Column()
  image: string;

  /** Стоимость подарка, округленная до сотых. */
  @Column({ type: 'decimal', scale: 2 })
  price: number;

  /** Сумма сборов на подарок, округленная до сотых. */
  @Column({ type: 'decimal', scale: 2, default: 0 })
  raised: number;

  /** Описание подарка. */
  @Column({ length: 1024 })
  description: string;

  /** Счетчик тех, кто скопировал себе подарок. */
  @Column({ default: 0 })
  copied: number;

  /** Дата регистрации желания пользователя. */
  @CreateDateColumn()
  createdAt: Date;

  /** Дата последнего обновления желания пользователя. */
  @UpdateDateColumn()
  updatedAt: Date;

  /** Пользователь, добавивший пожелание на подарок. У пользователя может быть много пожеланий. */
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  /** Массив ссылок на подарки от других пользователей. Подарок один, а скинуться на него могут многие. */
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
}
