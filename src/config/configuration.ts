import { registerAs } from '@nestjs/config';
import Joi from 'joi';

interface IAppConfig {
  nodeEnv: string;
  port: number;
}

export default registerAs('app', () => {
  const values: IAppConfig = {
    nodeEnv: process.env['NODE_ENV'],
    port: parseInt(process.env['PORT']),
  };

  const schema = Joi.object<IAppConfig, true>({
    nodeEnv: Joi.string().required().valid('development', 'production', 'test'),
    port: Joi.number().required(),
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
