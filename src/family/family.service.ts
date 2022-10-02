/* eslint-disable fp/no-loops */
import { Injectable, Logger } from '@nestjs/common';
import type { Family } from '@prisma/client';
import slug from 'slug';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FamilyService {
  private readonly logger = new Logger(FamilyService.name);

  constructor(private readonly prismaService: PrismaService) {}
  findAll() {
    return `This action returns a families`;
  }

  findById(id: string): Promise<Family | null> {
    return this.prismaService.family.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: { name: string }): Promise<Family> {
    const familySlug = slug(data.name);
    const extendedData = {
      ...data,
      slug: familySlug,
    };

    // eslint-disable-next-line fp/no-let
    let family: Family | null = null;
    // eslint-disable-next-line fp/no-let
    let counter = 0;

    while (!family) {
      try {
        if (counter !== 0) {
          extendedData.slug = `${familySlug}-${counter}`;
        }

        // eslint-disable-next-line no-await-in-loop
        family = await this.prismaService.family.create({
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
