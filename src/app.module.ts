import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { AdminModule } from './admin/admin.module';
import type { EnvironmentVariables } from './configuration/EnvironmentVariables';
import validationSchema from './configuration/validation';
import { DependentModule } from './dependent/dependent.module';
import { FamilyModule } from './family/family.module';
import { HouseholderModule } from './householder/householder.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { IBAN } from './shared/scalars/iban.scalar';
import { Money } from './shared/scalars/money.scalar';

const mocks = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DateTime: () => {
    return new Date();
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  String: () => {
    return 'string-mock';
  },
};

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      validationSchema,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        playground: false,
        debug: true,
        mocks,
        autoSchemaFile: true,
        resolvers: { Money, IBAN },
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        introspection: configService.get('INTROSPECTION_ENABLED'),
      }),
    }),
    ProjectModule,
    FamilyModule,
    HouseholderModule,
    DependentModule,
    AdminModule,
    PrismaModule,
  ],
})
export class AppModule {}
