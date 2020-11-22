import express from 'express';
import { gql } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';

import * as repository from './repository';

export const typeDefs = gql`
  scalar DateTime

  type Payment {
    id: Int!
    contractId: Int!
    description: String!
    value: Float!
    time: DateTime!
    isImported: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    isDeleted: Boolean!
  }

  type PaymentsData {
    sum: Float!
    items: [Payment]!
  }

  type Query {
    payments(
      contractId: Int!
      timeStart: DateTime!
      timeEnd: DateTime!
    ): PaymentsData
  }
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

  Query: {
    payments: async (parent: any, args: any) => {
      const result = await repository.payments.selectByContractIdAndTimeFrame(
        args.contractId,
        [args.timeStart, args.timeEnd]
      );

      return result;
    },
  },
};
