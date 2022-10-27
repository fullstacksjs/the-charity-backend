import Joi from 'joi';

export type EnvKeys =
  | 'DATABASE_URL'
  | 'INTROSPECTION_ENABLED'
  | 'NODE_ENV'
  | 'PORT'
  | 'PRISMA_LOG_LEVEL'
  | 'SESSION_SECRET';

export const configSchema = Joi.object<Record<EnvKeys, string>>({
  /* eslint-disable @typescript-eslint/naming-convention */
  NODE_ENV: Joi.string()
    .valid('production')
    .valid('development')
    .valid('test')
    .required(),
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['postgres', 'postgresql'] })
    .required(),
  INTROSPECTION_ENABLED: Joi.boolean().default(false),
  PRISMA_LOG_LEVEL: Joi.string()
    .valid('error')
    .valid('info')
    .valid('query')
    .valid('warn'),

  SESSION_SECRET: Joi.string().required(),
  /* eslint-enable @typescript-eslint/naming-convention */
});
