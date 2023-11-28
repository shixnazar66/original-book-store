import { DocumentBuilder } from "@nestjs/swagger";

export const SwaggerConfig = new DocumentBuilder()
.setTitle('book-store')
.setDescription('The cats API description')
.setVersion('1.0')
.addTag('methods')
.build();