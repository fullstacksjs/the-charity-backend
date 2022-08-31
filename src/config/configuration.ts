import { registerAs } from '@nestjs/config';
import { IAppConfig } from '../../@types/env';
import Joi from 'joi';

export default registerAs('app', () => {
  const values: IAppConfig = {
    nodeEnv: process.env['NODE_ENV'],
    port: parseInt(process.env['PORT']),
    host: process.env['HOST'],
  };

  const schema = Joi.object<IAppConfig, true>({
    nodeEnv: Joi.string()
      .required()
      .valid('development', 'production', 'testing'),
    port: Joi.number().required(),
    host: Joi.string().required(),
  });

  const { error } = schema.validate(values, { abortEarly: true });
  if (error) {
    throw new Error(
      `Validation failed - Is there an environment variable missing?
        ${error.message}`,
    );
  }

  return values;
});
