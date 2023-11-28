import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {env} from './common/config/env.config'
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './common/config/swagger.config';

const port = env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger:['error','warn']});
  app.useGlobalPipes(new ValidationPipe({transform:true,whitelist:true}))
  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('book-store', app, document);
  await app.listen(port,()=>console.log(`server listening ${port} 👀`));
}
bootstrap();
