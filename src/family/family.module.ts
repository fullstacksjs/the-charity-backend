import { Module } from '@nestjs/common';

import { FamilyResolver } from './family.resolver';
import { FamilyService } from './family.service';

@Module({
  providers: [FamilyResolver, FamilyService],
})
export class FamilyModule {}
