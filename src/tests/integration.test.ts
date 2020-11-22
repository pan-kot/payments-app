/* tslint:disable:no-implicit-dependencies */

import { createTestClient } from 'apollo-server-testing';

import knex from '../repository/knex';
import apollo from '../apollo';

const { query, mutate } = createTestClient(apollo);

const GET_PAYMENTS = `
  query GetPayments($contractId: Int!, $frameStart: DateTime!, $frameEnd: DateTime!) {
    payments(contractId: $contractId, frameStart: $frameStart, frameEnd: $frameEnd) {
      sum
      items {
        id
      }
    }
  }
`;

const ADD_NEW_PAYMENT = `
  mutation AddNewPayment {
    addPayment(
      contractId: 1,
      description: "new",
      value: -125,
      time: "2020-02-02T00:00:00.000Z",
      isImported: false
    ) {
      id
    }
  }
`;

const UPDATE_NEW_PAYMENT = `
  mutation UpdateNewPayment {
    updatePayment(
      id: 6,
      contractId: 1,
      description: "new",
      value: -150,
      time: "2020-02-02T00:00:00.000Z",
      isImported: false
    ) {
      success
    }
  }
`;

const DELETE_NEW_PAYMENT = `
  mutation DeletePayment {
    deletePayment(id: 6) {
      success
    }
  }
`;

function queryPaymentsForContract1_2020() {
  return query({
    query: GET_PAYMENTS,
    variables: {
      contractId: 1,
      frameStart: '2020-01-01',
      frameEnd: '2020-12-31',
    },
  });
}

describe('integration', () => {
  beforeEach(async () => {
    await knex.seed.run({ specific: 'integration.ts' });
  });

  it('case 1', async () => {
    let result;

    result = await queryPaymentsForContract1_2020();
    expect(result.data.payments.sum).toBe(150);

    await mutate({ mutation: ADD_NEW_PAYMENT });
    result = await queryPaymentsForContract1_2020();
    expect(result.data.payments.sum).toBe(25);

    await mutate({ mutation: UPDATE_NEW_PAYMENT });
    result = await queryPaymentsForContract1_2020();
    expect(result.data.payments.sum).toBe(0);

    await mutate({ mutation: DELETE_NEW_PAYMENT });
    result = await queryPaymentsForContract1_2020();
    expect(result.data.payments.sum).toBe(150);
  });
});
