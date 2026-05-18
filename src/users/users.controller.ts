import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { type UsersService } from './users.service';
import { type Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getOwnProfile(@Req() req: Request) {
    return this.usersService.findOne({ id: req.user.id });
  }

  @Patch('me')
  async updateProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateOne({ id: req.user.id }, updateUserDto);
  }

  
}
