import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import validationSchema from './configuration/validation';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      validationSchema,
    }),
    PrismaModule,
  ],
})
export class AppModule {}
