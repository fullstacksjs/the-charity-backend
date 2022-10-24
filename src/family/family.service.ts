import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import {
  convertCodeNumberToFamilyCode,
  extractCodeNumberFromFamilyCode,
} from '../utils';
import type { CreateFamilyInput } from './dto/input/create-family-input.dto';
import type { GetFamiliesFilters } from './dto/input/get-families-filter.dto';
import type { GetFamiliesOrderBy } from './dto/input/get-families-order-by.dto';

@Injectable()
export class FamilyService {
  private readonly logger = new Logger(FamilyService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: GetFamiliesFilters, orderBy: GetFamiliesOrderBy) {
    const families = await this.prisma.family.findMany({
      where: {
        ...(filters.householder_id && {
          householder: { id: filters.householder_id },
        }),
      },
      orderBy: {
        ...(orderBy.created_at && { created_at: orderBy.created_at }),
      },
    });

    return families;
  }

  findById(id: string) {
    return this.prisma.family.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateFamilyInput) {
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
