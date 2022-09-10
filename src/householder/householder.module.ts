import { Module } from '@nestjs/common';

import { HouseholderResolver } from './householder.resolver';
import { HouseholderService } from './householder.service';

@Module({
  providers: [HouseholderResolver, HouseholderService],
})
export class HouseholderModule {}
