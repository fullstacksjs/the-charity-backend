import { Env, getEnv as getBaseEnv, toInteger } from '@fullstacksjs/toolbox';
import ms from 'ms';

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
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },

    cors: {
      credentials: true,
      originAsRegex: /https?:\/\/[a-z0-9\-_]+-fullstacks\.vercel\.app/,
      apolloSandboxOrigin: 'https://studio.apollographql.com',
    },
  },

  auth: {
    session: {
      secret: getEnv('SESSION_SECRET')!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: '/',
        httpOnly: true,
        secure: true,
        maxAge: ms('7d'),
      },
    },
  },
};

export default () => config;
