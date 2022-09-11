import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Query(() => [Admin], { name: 'admins' })
  findAll() {
    return this.adminService.findAll();
  }

  @Query(() => Admin, { name: 'admin' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adminService.findOne(id);
  }
}
