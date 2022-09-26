import type { INestApplication, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

import type { EnvironmentVariables } from '../configuration';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    const logLevel = configService.get('PRISMA_LOG_LEVEL');
    super({
      log: logLevel ? [logLevel] : undefined,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  enableShutdownHook(app: INestApplication) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
