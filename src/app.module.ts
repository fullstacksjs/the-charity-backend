import { getNodeEnv } from '@fullstacksjs/toolbox';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import path from 'path';

import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      envFilePath: [path.join(process.cwd(), `.${getNodeEnv()}.env`)],
      load: [configuration],
    }),
    PrismaModule,
  ],
})
export class AppModule {}
