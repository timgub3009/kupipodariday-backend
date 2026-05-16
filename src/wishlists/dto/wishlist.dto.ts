import { UserPublicProfileResponseDto } from "src/users/dto/user-public-profile-response.dto";
import { WishPartialDto } from "src/wishes/dto/wish-partial.dto";

export class WishlistDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  image: string;
  owner: UserPublicProfileResponseDto;
  items: WishPartialDto[];
}
