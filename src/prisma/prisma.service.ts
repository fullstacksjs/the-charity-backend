import type { INestApplication, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

import type { Config, PrismaConfig } from '../configuration';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(configService: ConfigService<Config>) {
    const config = configService.get<PrismaConfig>('prisma');
    super({ log: config?.logLevel });
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
