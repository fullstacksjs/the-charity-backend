import { getNodeEnv } from '@fullstacksjs/toolbox';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import path from 'path';

import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      envFilePath: [path.join(process.cwd(), `.${getNodeEnv()}.env`)],
      load: [configuration],
    }),
  ],
})
export class AppModule {}
