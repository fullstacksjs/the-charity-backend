import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import type { CreateHouseholderInput } from './dto/input/create-householder.input';

@Injectable()
export class HouseholderService {
  private readonly logger = new Logger(HouseholderService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateHouseholderInput) {
    try {
      const householder = await this.prisma.householder.create({ data });
      return householder;
    } catch (error) {
      this.logger.error({ errorOnCreateHouseholder: error });
      throw error;
    }
  }
}
