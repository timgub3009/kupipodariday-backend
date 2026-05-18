import { UserProfileResponseDto } from "src/users/dto/user-profile-response.dto";

declare module 'express' {
  interface Request {
    user: UserProfileResponseDto;
  }
}