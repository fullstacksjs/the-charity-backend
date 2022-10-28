import { HttpStatus } from '@nestjs/common';
import * as pactum from 'pactum';

export const graphqlRequest = (query: string) => {
  return pactum
    .spec()
    .post('/graphql')
    .withHeaders('Content-Type', 'application/json')
    .withGraphQLQuery(query)
    .expectStatus(HttpStatus.OK);
};
