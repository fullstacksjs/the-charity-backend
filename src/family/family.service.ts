import { Injectable, Logger } from '@nestjs/common';
import type { Family } from '@prisma/client';
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

    // eslint-disable-next-line fp/no-let
    let family: Family | null = null;
    // eslint-disable-next-line fp/no-let
    let counter = 0;

    // eslint-disable-next-line fp/no-loops
    while (!family) {
      try {
        if (counter !== 0) {
          extendedData.slug = `${familySlug}-${counter}`;
        }

        // eslint-disable-next-line no-await-in-loop
        family = await this.prisma.family.create({
          data: extendedData,
        });
      } catch (error: any) {
        if (error?.code === 'P2002' && error?.meta?.target?.includes('slug')) {
          counter++;
        } else {
          this.logger.error({ errorOnCreateFamily: error });
          throw error;
        }
      }
    }

    return family;
  }
}
