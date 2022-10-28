import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import type { Config, ServerConfig } from './configuration';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // https://stackoverflow.com/questions/65767024/express-session-not-working-in-production-deployment
  app.enable('trust proxy');

  const configService = app.get(ConfigService<Config, true>);
  const prismaService = app.get(PrismaService);

  prismaService.enableShutdownHook(app);

  const { port } = configService.get<ServerConfig>('server');

  await app.listen(port);
}

void bootstrap();
