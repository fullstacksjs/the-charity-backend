import { Injectable } from '@nestjs/common';

@Injectable()
export class FamilyService {
  findAll() {
    return `This action returns a families`;
  }

  findOne(id: number) {
    return `This action returns a #${id} family`;
  }
}
