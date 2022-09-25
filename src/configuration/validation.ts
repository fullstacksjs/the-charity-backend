import Joi from 'joi';

import type { EnvironmentVariables } from './EnvironmentVariables';

const schema = Joi.object<EnvironmentVariables>({
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
  INTROSPECTION_ENABLED: Joi.boolean().default(false).required(),
  PRISMA_LOG_LEVEL: Joi.string()
    .valid('error')
    .valid('info')
    .valid('query')
    .valid('warn'),
  /* eslint-enable @typescript-eslint/naming-convention */
});

export default schema;
