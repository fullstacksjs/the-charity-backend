import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }
}
