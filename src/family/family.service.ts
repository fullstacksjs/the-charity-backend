import { Injectable, Logger } from '@nestjs/common';
import type { Family } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import type { CreateFamilyInput } from './dto/input/create-family-input.dto';

@Injectable()
export class FamilyService {
  private readonly logger = new Logger(FamilyService.name);

  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return `This action returns a families`;
  }

  findById(id: string): Promise<Family | null> {
    return this.prisma.family.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateFamilyInput): Promise<Family> {
    try {
      const family = await this.prisma.family.create({ data });
      return family;
    } catch (error) {
      this.logger.error({ errorOnCreateFamily: error });
      throw error;
    }
  }
}
