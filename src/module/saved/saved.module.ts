import { Module } from '@nestjs/common';
import { SavedService } from './saved.service';
import { SavedController } from './saved.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saved } from './entities/saved.entity';
import { User } from '../user/entities/user.entity';
import { Book } from '../book/entities/book.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Saved,User,Book])],
  controllers: [SavedController],
  providers: [SavedService],
})
export class SavedModule {}
