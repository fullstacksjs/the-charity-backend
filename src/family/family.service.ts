import { Injectable } from '@nestjs/common';
import type { Family } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FamilyService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return `This action returns a families`;
  }

  findFamilyById(id: string): Promise<Family | null> {
    return this.prisma.family.findUnique({
      where: {
        id,
      },
    });
  }
}
