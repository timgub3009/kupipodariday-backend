/**
 * Сущность описывает зарегистрированного пользователя системы.
 * Хранит всю информацию о человеке, необходимую для авторизации,
 * отображения профиля и связей с его подарками, оферами и подборками.
 */

import { DEFAULT_USER_AVATAR_URL } from 'src/shared/constants';
import { Ru } from 'src/shared/locales';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  /** Уникальный идентификатор пользователя. */
  id: number;

  @Column({ length: 64, unique: true })
  /** Имя пользователя, отображающееся в профиле. */
  username: string;

  @Column({ length: 200, default: Ru.PROFILE_DESCRIPTION_DEFAULT_TEXT })
  /** Описание профиля пользователя. */
  about: string;

  @Column({ default: DEFAULT_USER_AVATAR_URL })
  /** Аватар пользователя. */
  avatar: string;

  @Column({ unique: true })
  /** Почта пользователя. */
  email: string;

  @Column({ select: false })
  /** Пароль пользователя. */
  password: string;

  @CreateDateColumn()
  /** Дата регистрации (создания) профиля пользователя. */
  createdAt: Date;

  @UpdateDateColumn()
  /** Дата последнего обновления информации профиля пользователя. */
  updatedAt: Date;
}
