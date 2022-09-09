import { ObjectType } from '@nestjs/graphql';

import { Member } from '../../shared';

@ObjectType({ implements: Member })
export class Dependent extends Member {}
