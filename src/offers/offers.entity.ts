/**
 * Сущность описывает предложение внесения денег на подарок.
 */

import { User } from 'src/users/users.entity';
import { Wish } from 'src/wishes/wishes.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/** Предложение скинуться на подарок. */
@Entity()
export class Offer {
  /** Уникальный идентификатор. */
  @PrimaryGeneratedColumn()
  id: number;

  /** Сумма заявки, которая нужна, округленная до двух знаков после запятой. */
  @Column({ type: 'decimal', scale: 2 })
  amount: number;

  /** Флаг, определяющий показывать ли информацию о скидывающихся, false - показывать. */
  @Column({ default: false })
  hidden: boolean;

  /** Дата регистрации предложения скинуться на подарок. */
  @CreateDateColumn()
  createdAt: Date;

  /** Дата последнего обновления предложения скинуться на подарок. */
  @UpdateDateColumn()
  updatedAt: Date;

  /** Пользователь, который скидывается на подарок. На подарок могут скидываться несколько пользователей. */
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  /** Подарок, на который скидываются пользователи. Взносов может быть много. */
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;
}
