import { Injectable } from '@nestjs/common';

@Injectable()
export class HouseholderService {
  findAll() {
    return `This action returns all householder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} householder`;
  }
}
