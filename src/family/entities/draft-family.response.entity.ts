import { ObjectType } from '@nestjs/graphql';

import relayTypes from '../../shared/relay.types';
import { DraftFamily } from './draft-family.entity';

@ObjectType()
export default class DraftFamilyResponse extends relayTypes<DraftFamily>(
  DraftFamily,
) {}
