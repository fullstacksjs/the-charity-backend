import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { any, eachLike } from 'pactum-matchers';

import { AppModule } from '../src/app.module';
import { graphqlRequest } from './utils';

describe('Smoke', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.listen(0);
    const url = await app.getUrl();
    const baseUrl = url.replace('[::1]', 'localhost');
    pactum.request.setBaseUrl(baseUrl);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to fetch the schema', async () => {
    const query = `query { __schema { types { description } } }`;

    await graphqlRequest(query).expectJsonMatch({
      data: { __schema: { types: eachLike({ description: any() }) } },
    });
  });
});
