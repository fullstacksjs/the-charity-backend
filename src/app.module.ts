import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AdminModule } from './admin/admin.module';
import validationSchema from './configuration/validation';
import { DependentModule } from './dependent/dependent.module';
import { FamilyModule } from './family/family.module';
import { GraphQLConfigModule } from './graphql-config/graphql-config.module';
import { HouseholderModule } from './householder/householder.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      validationSchema,
    }),
    GraphQLConfigModule,
    ProjectModule,
    FamilyModule,
    HouseholderModule,
    DependentModule,
    AdminModule,
    PrismaModule,
  ],
})
export class AppModule {}
