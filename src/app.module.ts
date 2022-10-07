import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { AdminModule } from './admin/admin.module';
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
  ],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
