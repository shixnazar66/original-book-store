import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { typeormConfig } from './common/config/typeorm.config';
import {TypeOrmModule} from '@nestjs/typeorm'
import { CategoryModule } from './module/category/category.module';
import { BookModule } from './module/book/book.module';
import { SavedModule } from './module/saved/saved.module';
import { DeliveryModule } from './module/delivery/delivery.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), AuthModule, UserModule, CategoryModule, BookModule, SavedModule, DeliveryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
