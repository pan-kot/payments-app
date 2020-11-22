import { gql } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';

import * as customScalars from './customScalars';
import * as payments from './payments';

export const typeDefs = gql`
  ${customScalars.typeDefs}

  ${payments.typeDefs}
`;

export const resolvers = {
  ...customScalars.resolvers,

  Query: {
    ...payments.resolvers.Query,
  },

  Mutation: {
    ...payments.resolvers.Mutation,
  },
};
