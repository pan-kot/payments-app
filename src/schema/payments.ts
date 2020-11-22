import { gql } from 'apollo-server-express';

import { Payment } from '../model';
import * as repository from '../repository';

export const typeDefs = gql`
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
      frameStart: DateTime!
      frameEnd: DateTime!
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

type PaymentsArgs = {
  contractId: number;
  frameStart: Date;
  frameEnd: Date;
};

type PaymentsData = {
  sum: number;
  items: Payment[];
};

type PaymentDto = {
  contractId: number;
  description: string;
  value: number;
  time: Date;
  isImported: boolean;
};

type AddPaymentArgs = PaymentDto;

type AddPaymentResult = { id: number };

type UpdatePaymentArgs = { id: number } & PaymentDto;

type UpdatePaymentResult = { success: boolean };

type DeletePaymentArgs = { id: number };

type DeletePaymentResult = { success: boolean };

export const resolvers = {
  Query: {
    payments: async (_: any, args: PaymentsArgs): Promise<PaymentsData> => {
      const result = await repository.payments.selectByContractIdAndTimeFrame(
        args.contractId,
        [args.frameStart, args.frameEnd]
      );

      return result;
    },
  },

  Mutation: {
    addPayment: async (
      _: any,
      args: AddPaymentArgs
    ): Promise<AddPaymentResult> => {
      const id = await repository.payments.addOne(args);

      return { id };
    },

    updatePayment: async (
      _: any,
      args: UpdatePaymentArgs
    ): Promise<UpdatePaymentResult> => {
      const { id, ...payment } = args;

      const success = await repository.payments.updateOne(id, payment);

      return { success };
    },

    deletePayment: async (
      _: any,
      args: DeletePaymentArgs
    ): Promise<DeletePaymentResult> => {
      const success = await repository.payments.deleteOne(args.id);

      return { success };
    },
  },
};
