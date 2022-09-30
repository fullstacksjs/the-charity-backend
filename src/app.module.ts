import { Module } from '@nestjs/common';

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
})
export class AppModule {}
