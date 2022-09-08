import { ObjectType } from '@nestjs/graphql';

import IMember from '../../types/member.entity';

@ObjectType({ implements: IMember })
export class Dependent extends IMember {}
