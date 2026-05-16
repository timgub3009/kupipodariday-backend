import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { HashService } from 'src/hash/hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, HashService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
