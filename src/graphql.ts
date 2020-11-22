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

  type AddPaymentResult {
    id: Int!
  }

  type UpdatePaymentResult {
    success: Boolean!
  }

  type DeletePaymentResult {
    success: Boolean!
  }

  type Mutation {
    addPayment(
      contractId: Int!
      description: String!
      value: Float!
      time: DateTime!
      isImported: Boolean!
    ): AddPaymentResult!

    updatePayment(
      id: Int!
      contractId: Int!
      description: String!
      value: Float!
      time: DateTime!
      isImported: Boolean!
    ): UpdatePaymentResult!

    deletePayment(id: Int!): DeletePaymentResult!
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

  Mutation: {
    addPayment: async (parent: any, args: any) => {
      const [id] = await repository.payments.addOne(args);

      return { id };
    },

    updatePayment: async (parent: any, args: any) => {
      const { id, ...payment } = args;

      const success = await repository.payments.updateOne(id, payment);

      return { success };
    },

    deletePayment: async (parent: any, args: any) => {
      const success = await repository.payments.deleteOne(args.id);

      return { success };
    },
  },
};
