import { Injectable, Logger } from '@nestjs/common';
import type { Family } from '@prisma/client';
import { nanoid } from 'nanoid';
import slug from 'slug';

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
    const familySlug = slug(data.name);
    const extendedData = {
      ...data,
      slug: familySlug,
    };

    const isFamilyExists = await this.prisma.family.count({
      where: { slug: familySlug },
    });

    if (isFamilyExists) {
      extendedData.slug = `${familySlug}-${nanoid(5)}`;
    }

    try {
      const family = await this.prisma.family.create({ data: extendedData });
      return family;
    } catch (error) {
      this.logger.error({ errorOnCreateFamily: error });
      throw error;
    }
  }
}
