import { HttpStatus } from '@nestjs/common';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql/language/printer';
import * as pactum from 'pactum';

export const graphqlRequest = (query: DocumentNode) => {
  return pactum
    .spec()
    .post('/graphql')
    .withHeaders('Content-Type', 'application/json')
    .withGraphQLQuery(print(query))
    .expectStatus(HttpStatus.OK);
};
