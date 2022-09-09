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
import { CustomIBAN } from './scalars/iban.scalar';
import { CustomMoney } from './scalars/money.scalar';

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
      mocks,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      resolvers: { Money: CustomMoney, IBAN: CustomIBAN },
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
