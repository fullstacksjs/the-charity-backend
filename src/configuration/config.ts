import { Env, getEnv as getBaseEnv, toInteger } from '@fullstacksjs/toolbox';

import type { Config } from './config.interface';
import type { EnvKeys } from './config.schema';

const getEnv = getBaseEnv<EnvKeys>;

const config: Config = {
  server: {
    port: toInteger(getEnv('PORT', '3000')),
  },

  prisma: {
    logLevel: getEnv('PRISMA_LOG_LEVEL')?.split(
      ',',
    ) as Config['prisma']['logLevel'],
  },

  graphql: {
    debug: Env.isDev,
    introspection: Boolean(getEnv('INTROSPECTION_ENABLED')),
    playgroundEnabled: false,

    cors: {
      credentials: true,
      originAsRegex: /https?:\/\/[a-z0-9\-_]+-fullstacks\.vercel\.app/,
      apolloSandboxOrigin: 'https://studio.apollographql.com',
    },
  },
};

export default () => config;
