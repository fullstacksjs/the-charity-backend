import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { AdminModule } from './admin/admin.module';
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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      debug: true,
      cors: {
        // TODO: origin should be moved into configModule - not sure regex is valid!
        // https://www.debuggex.com/r/XTrC-yG2Yeq2_sAm
        origin: /https?:\/\/[a-z0-9\-_]+-fullstacks\.vercel\.app/,
        credentials: true,
      },
      mocks,
      autoSchemaFile: true,
      resolvers: { Money, IBAN },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
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
