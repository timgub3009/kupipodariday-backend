import { NotFoundException } from '@nestjs/common';
import { NotFoundExceptionTexts } from './locales';

export const throwNotFoundException = (message: NotFoundExceptionTexts) => {
  throw new NotFoundException(message);
};
