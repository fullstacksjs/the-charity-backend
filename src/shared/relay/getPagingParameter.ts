import { isNull } from '@fullstacksjs/toolbox';
import { cursorToOffset } from 'graphql-relay';

import type { ConnectionArgs } from './connection.args';

type PagingMeta =
  | { pagingType: 'backward'; before?: string; last: number }
  | { pagingType: 'forward'; after?: string; first: number }
  | { pagingType: 'none' };

function getMeta(args: ConnectionArgs): PagingMeta {
  const { first = 0, last = 0, after, before } = args;

  const isForwardPaging = Boolean(first || after);
  const isBackwardPaging = Boolean(last || before);

  if (isForwardPaging) return { pagingType: 'forward', after, first };
  if (isBackwardPaging) return { pagingType: 'backward', before, last };

  return { pagingType: 'none' };
}

export function getPagingParameters(args: ConnectionArgs) {
  const meta = getMeta(args);

  switch (meta.pagingType) {
    case 'forward': {
      if (isNull(meta.after)) return { limit: meta.first, offset: 0 };

      const offset = cursorToOffset(meta.after) + 1;

      if (isNaN(offset)) throw new Error('invalid before query');
      return { limit: meta.first, offset };
    }

    case 'backward': {
      const { last, before } = meta;
      const offset = cursorToOffset(before!) - last;

      if (isNaN(offset)) {
        throw new Error('invalid before query');
      }

      return offset >= 0
        ? { offset, limit: last }
        : { offset: 0, limit: Math.max(last + offset, 0) };
    }
    default:
      return {};
  }
}
