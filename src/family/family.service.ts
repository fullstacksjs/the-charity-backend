import { Injectable, Logger } from '@nestjs/common';
import type { Family } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import {
  convertCodeNumberToFamilyCode,
  extractCodeNumberFromFamilyCode,
} from '../utils';
import type { CreateFamilyInput } from './dto/input/create-family-input.dto';

@Injectable()
export class FamilyService {
  private readonly logger = new Logger(FamilyService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    take,
    skip,
  }: {
    take?: number;
    skip?: number;
  }): Promise<Family[]> {
    const families = await this.prisma.family.findMany({ take, skip });

    return families;
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
      const lastCreatedFamily = await this.prisma.family.findFirst({
        orderBy: { created_at: 'desc' },
        select: { code: true },
      });

      const codeNumber = lastCreatedFamily
        ? extractCodeNumberFromFamilyCode(lastCreatedFamily.code) + 1
        : 1;

      const extendedData = {
        ...data,
        code: convertCodeNumberToFamilyCode(codeNumber),
      };

      const family = await this.prisma.family.create({ data: extendedData });
      return family;
    } catch (error) {
      this.logger.error({ errorOnCreateFamily: error });
      throw error;
    }
  }
}
