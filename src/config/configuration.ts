import {
  getEnv as baseGetEnv,
  getNodeEnv,
  toInteger,
} from '@fullstacksjs/toolbox';
import { registerAs } from '@nestjs/config';
import Joi from 'joi';

const getEnv = baseGetEnv<Env>;

export interface AppConfig {
  nodeEnv?: string;
  port?: number;
}

export default registerAs('app', () => {
  const port = getEnv('PORT');
  console.log(port);

  const values: AppConfig = {
    nodeEnv: getNodeEnv(),
    port: port ? toInteger(port) : undefined!,
  };

  const schema = Joi.object<AppConfig, true>({
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
