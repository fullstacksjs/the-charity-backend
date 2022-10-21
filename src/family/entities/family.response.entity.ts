import { ObjectType } from '@nestjs/graphql';

import relayTypes from '../../shared/relay.types';
import { Family } from './family.entity';

@ObjectType()
export default class DraftFamilyResponse extends relayTypes<Family>(Family) {}
