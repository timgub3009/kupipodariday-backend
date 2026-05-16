import { OfferDto } from "src/offers/dto/offer.dto";

export class UserWishesDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  link: string;
  image: string;
  price: number;
  raised: number;
  copied: number;
  description: string;
  offers: OfferDto[];
}