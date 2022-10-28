import { faker } from '@faker-js/faker';
import type { Admin } from '@prisma/client';

import type { LoginInput, LoginResponseDto } from '../dto';

export const invalidUsername: LoginInput = {
  username: 'invalid@gmail.com',
  password: '1234567',
};

export const invalidPassword: LoginInput = {
  username: 'admin@gmail.com',
  password: 'admin',
};

export const validCredentials: LoginInput = {
  username: 'admin@gmail.com',
  password: '123456789',
};

export const dbAdmin: Admin = {
  id: faker.database.mongodbObjectId(),
  username: 'admin@gmail.com',
  password:
    /* cspell:disable-next-line */
    '$argon2id$v=19$m=4096,t=3,p=1$Jco88ueBtDcTT3swHr2meQ$itzdHbqiYIRYfGDKh++U0UFFo2Z6mD9rT54HP+y4e5w', // 123456789
  created_at: faker.date.past(),
  updated_at: faker.date.recent(),
};

export const adminExpectedResponse: LoginResponseDto = {
  id: dbAdmin.id,
  username: dbAdmin.username,
};
