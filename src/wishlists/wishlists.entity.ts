/**
 * Сущность описывает подборку подарков (вишлист) со всеми ее связями.
 */

import { User } from 'src/users/users.entity';
import { Wish } from 'src/wishes/wishes.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/** Коллекция или подборка подарков (вишлист). */
@Entity()
export class Wishlist {
  /** Уникальный идентификатор. */
  @PrimaryGeneratedColumn()
  id: number;

  /** Название списка. */
  @Column({ length: 250 })
  name: string;

  /** Описание вишлиста. */
  @Column({ length: 1500 })
  description: string;

  /** Обложка для подборки. */
  @Column()
  image: string;

  /** Дата регистрации вишлиста. */
  @CreateDateColumn()
  createdAt: Date;

  /** Дата последнего обновления вишлиста. */
  @UpdateDateColumn()
  updatedAt: Date;

  /** Пользователь, создавший подборку. У пользователя может быть не одна подборка. */
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  /**
   * Набор ссылок на подарки.
   * - Один подарок может быть в нескольких подборках.
   * - Один вишлист может содержать несколько подарков.
   */
  @ManyToMany(() => Wish)
  items: Wish[];
}
