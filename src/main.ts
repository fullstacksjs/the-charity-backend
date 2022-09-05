import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import type { EnvironmentVariables } from '../@types/environment';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<EnvironmentVariables>);
  const prismaService = app.get(PrismaService);

  prismaService.enableShutdownHook(app);

  // Null-safety is handled in Service
  const port = configService.get('PORT');

  console.log({ port });

  await app.listen(port);
}

void bootstrap();
