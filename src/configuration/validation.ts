import Joi from 'joi';

const schema = Joi.object({
  /* eslint-disable @typescript-eslint/naming-convention */
  NODE_ENV: Joi.string()
    .valid('production')
    .valid('development')
    .valid('test')
    .required(),
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['file'] })
    .required(),
  /* eslint-enable @typescript-eslint/naming-convention */
});

export default schema;
