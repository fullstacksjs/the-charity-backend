import { Injectable } from '@nestjs/common';

@Injectable()
export class DependentService {
  findAll() {
    return `This action returns all dependent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dependent`;
  }
}
