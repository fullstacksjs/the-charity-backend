import { getNodeEnv } from '@fullstacksjs/toolbox';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import path from 'path';

import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      envFilePath: [path.join(process.cwd(), `.${getNodeEnv()}.env`)],
      validationSchema: Joi.object({
        /* eslint-disable @typescript-eslint/naming-convention */
        NODE_ENV: Joi.string()
          .valid('production')
          .valid('development')
          .valid('test')
          .required(),
        PORT: Joi.number().required(),
        DATABASE_URL: Joi.string()
          .uri({ scheme: ['file'] })
          .required(),
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    }),
    PrismaModule,
  ],
})
export class AppModule {}
