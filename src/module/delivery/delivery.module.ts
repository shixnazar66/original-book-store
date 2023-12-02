import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Delivery } from './entities/delivery.entity';
import { Book } from '../book/entities/book.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Delivery,Book])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
