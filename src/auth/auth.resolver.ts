import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import ms from 'ms';

import { Admin } from '../admin/entities/admin.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Admin, { name: 'login', nullable: true })
  async login(
    @Args('input') data: LoginInput,
    @Context('res') response: Response,
    @Context('req') req: Request,
  ) {
    const admin = await this.authService.localLogin(data);
    req.session.userId = admin.id;

    response.cookie('is-logged-in', true, {
      httpOnly: false,
      maxAge: ms('7d'),
    });

    return admin;
  }
}
