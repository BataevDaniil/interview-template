import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { umzug } from './db/migrator';

async function bootstrap() {
  await umzug.up();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
