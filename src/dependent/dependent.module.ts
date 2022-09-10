import { Module } from '@nestjs/common';

import { DependentResolver } from './dependent.resolver';
import { DependentService } from './dependent.service';

@Module({
  providers: [DependentResolver, DependentService],
})
export class DependentModule {}
