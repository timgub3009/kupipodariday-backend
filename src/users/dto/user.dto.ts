import { WishDto } from 'src/wishes/dto/wish.dto';
import { WishlistDto } from 'src/wishlists/dto/wishlist.dto';

export class UserDto {
  id: number;
  username: string;
  about: string;
  avatar: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  wishes: WishDto[];
  offers: WishDto[];
  wishlists: WishlistDto[];
}
