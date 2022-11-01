import type { Type } from '@nestjs/common';
import { ObjectType } from '@nestjs/graphql';

import { relayTypes } from '../../shared';
import { Family } from './family.entity';

@ObjectType()
export class FamilyResponse extends relayTypes<Family>(
  Family as unknown as Type<Family>,
) {} // I can not convert union type to the Nest Type
