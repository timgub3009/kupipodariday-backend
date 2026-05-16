import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlists.entity';
import { Wish } from 'src/wishes/wishes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Wish])],
  providers: [WishlistsService],
  controllers: [WishlistsController],
  exports: [WishlistsService],
})
export class WishlistsModule {}
