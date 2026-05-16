import { OfferDto } from "src/offers/dto/offer.dto";
import { UserPublicProfileResponseDto } from "src/users/dto/user-public-profile-response.dto";

export class WishDto {
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
  owner: UserPublicProfileResponseDto;
  offers: OfferDto[];
}
