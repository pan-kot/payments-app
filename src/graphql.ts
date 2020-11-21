import express from 'express';
import { gql } from 'apollo-server-express';

import * as repository from './repository';

export const typeDefs = gql`
  scalar DateTime

  type Payment {
    id: Int!
    contractId: Int!
    description: String!
    value: Int!
    time: DateTime!
    isImported: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    isDeleted: Boolean!
  }

  type Query {
    payments: [Payment]
  }
`;

export const resolvers = {
  Query: {
    payments: async () => {
      const result = await repository.payments.selectByContractIdAndTimeFrame(
        1,
        [new Date('2020-01-01'), new Date('2021-01-01')]
      );

      return result.items;
    },
  },
};
