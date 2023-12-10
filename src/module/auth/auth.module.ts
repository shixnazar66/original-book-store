import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Saved } from '../saved/entities/saved.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Saved])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
