import { Module } from '@nestjs/common';

import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';

@Module({
  providers: [AdminResolver, AdminService],
})
export class AdminModule {}
