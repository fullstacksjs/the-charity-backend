import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import type { CreateHouseholderInput } from './dto/input/create-householder.input';

@Injectable()
export class HouseholderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateHouseholderInput) {
    try {
      const householder = await this.prisma.householder.create({ data });
      return householder;
    } catch (error) {
      console.log({ error });
      throw new Error('householder can not created');
    }
  }
}
