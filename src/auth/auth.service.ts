import { Injectable, UnauthorizedException } from '@nestjs/common';
import argon from 'argon2';
import { plainToInstance } from 'class-transformer';

import { PrismaService } from '../prisma/prisma.service';
import type { LoginInput } from './dto';
import { LoginResponseDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async localLogin(loginDto: LoginInput): Promise<LoginResponseDto> {
    const { username, password } = loginDto;
    const admin = await this.prisma.admin.findFirst({ where: { username } });
    if (!admin) throw new UnauthorizedException('AUTH.INVALID_CREDENTIALS');

    const isPasswordMatched = await argon.verify(admin.password, password);
    if (!isPasswordMatched)
      throw new UnauthorizedException('AUTH.INVALID_CREDENTIALS');

    return plainToInstance(LoginResponseDto, admin);
  }
}
