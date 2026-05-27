import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from '../../services/usuarios/users.service';
import {
  UsersController,
  UsersLogin,
} from '../../controllers/usuarios/users.controller';
import { AuthModule } from '../auth.module';
import { PushModule } from '../push/push.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PushModule, AuthModule],
  providers: [UsersService],
  controllers: [UsersController, UsersLogin],
})
export class UsersModule {}
