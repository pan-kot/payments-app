import { gql } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';

export const typeDefs = gql`
  scalar DateTime
`;

export const resolvers = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'DateTime custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      switch (ast.kind) {
        case Kind.STRING:
          return new Date(ast.value);

        default:
          return null;
      }
    },
  }),
};
