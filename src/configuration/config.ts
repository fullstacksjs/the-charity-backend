import { getEnv as getBaseEnv, toInteger } from '@fullstacksjs/toolbox';

import type { EnvKeys } from './EnvironmentVariables';
import type { Config } from './interface/config.interface';

const getEnv = getBaseEnv<EnvKeys>;

const config: Config = {
  nest: {
    port: toInteger(getEnv('PORT', '3000')),
    prismaLogLevel: getEnv('PRISMA_LOG_LEVEL', 'info') as
      | 'error'
      | 'info'
      | 'query'
      | 'warn',
  },

  graphql: {
    debug: true,
    introspection: Boolean(getEnv('INTROSPECTION_ENABLED', 'true')),
    playgroundEnabled: false,

    cors: {
      credentials: true,

      // https://www.debuggex.com/r/XTrC-yG2Yeq2_sAm
      originAsRegex: /https?:\/\/[a-z0-9\-_]+-fullstacks\.vercel\.app/,
      apolloSandboxOrigin: 'https://studio.apollographql.com',
    },
  },
};

export default (): Config => config;
