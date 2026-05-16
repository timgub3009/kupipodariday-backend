import { Module } from '@nestjs/common';
import { HashModule } from 'src/hash/hash.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, HashModule],
  providers: [],
  controllers: [],
})
export class AuthModule {}
