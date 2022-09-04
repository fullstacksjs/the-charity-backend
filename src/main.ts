import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import type { AppConfig } from './config/configuration';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<AppConfig>);
  const prismaService = app.get(PrismaService);

  prismaService.enableShutdownHook(app);

  // Null-safety is handled in Service
  const port = configService.get('port')!;

  await app.listen(port);
}

void bootstrap();
