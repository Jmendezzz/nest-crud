import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // Validate only the properties that are defined in the DTO, ignore the rest
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
