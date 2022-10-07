import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import type { Config, ServerConfig } from './configuration';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<Config, true>);
  const prismaService = app.get(PrismaService);

  prismaService.enableShutdownHook(app);

  const { port } = configService.get<ServerConfig>('server');

  await app.listen(port);
}

void bootstrap();
