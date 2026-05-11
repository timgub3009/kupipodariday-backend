/**
 * Сущность описывает зарегистрированного пользователя системы.
 * Хранит всю информацию о человеке, необходимую для авторизации,
 * отображения профиля и связей с его подарками, предложениями скинуть на подарки и подборками.
 */

import { Offer } from 'src/offers/offers.entity';
import { DEFAULT_USER_AVATAR_URL } from 'src/shared/constants';
import { Ru } from 'src/shared/locales';
import { Wish } from 'src/wishes/wishes.entity';
import { Wishlist } from 'src/wishlists/wishlists.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/** Пользователь. */
@Entity()
export class User {
  /** Уникальный идентификатор. */
  @PrimaryGeneratedColumn()
  id: number;

  /** Имя пользователя, отображающееся в профиле. */
  @Column({ length: 64, unique: true })
  username: string;

  /** Описание профиля пользователя. */
  @Column({ length: 200, default: Ru.PROFILE_DESCRIPTION_DEFAULT_TEXT })
  about: string;

  /** Аватар пользователя. */
  @Column({ default: DEFAULT_USER_AVATAR_URL })
  avatar: string;

  /** Почта пользователя. */
  @Column({ unique: true })
  email: string;

  /** Пароль пользователя. */
  @Column({ select: false })
  password: string;

  /** Дата регистрации (создания) профиля пользователя. */
  @CreateDateColumn()
  createdAt: Date;

  /** Дата последнего обновления информации профиля пользователя. */
  @UpdateDateColumn()
  updatedAt: Date;

  /** Список желаемых подарков. Один пользователь может добавить много подарков. */
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  /** Список вишлистов. Один пользователь может добавить много вишлистов. */
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];

  /** Список подарков, на которые скидывается пользователь. Один пользователь может скидываться на несколько подарков. */
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];
}
