import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { typeormConfig } from './common/config/typeorm.config';
import {TypeOrmModule} from '@nestjs/typeorm'


@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
