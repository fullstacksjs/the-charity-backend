import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import type { NestSessionOptions } from 'nestjs-session';
import { SessionModule } from 'nestjs-session';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import type { AuthConfig } from './configuration';
import { ConfigurationModule } from './configuration/configuration.module';
import { DependentModule } from './dependent/dependent.module';
import { FamilyModule } from './family/family.module';
import { GraphQLConfigModule } from './graphql-config/graphql-config.module';
import { HouseholderModule } from './householder/householder.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigurationModule,
    GraphQLConfigModule,
    ProjectModule,
    FamilyModule,
    HouseholderModule,
    DependentModule,
    AdminModule,
    PrismaModule,
    AuthModule,
    SessionModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): NestSessionOptions => {
        const config = configService.get<AuthConfig>('auth');
        return {
          session: config!.session,
        };
      },
    }),
  ],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
