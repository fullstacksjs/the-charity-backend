import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import type { CreateProjectInput } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return '';
  }

  findOne(_id: number) {
    return '';
  }

  createOne(data: CreateProjectInput) {
    return this.prisma.project.create({ data });
  }
}
