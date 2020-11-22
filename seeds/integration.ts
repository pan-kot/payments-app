import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('contracts').del();
  await knex('contracts').insert([
    { id: 1, description: 'contract-1' },
    { id: 2, description: 'contract-2' },
    { id: 3, description: 'contract-3' },
  ]);

  await knex('payments').del();
  await knex('payments').insert([
    {
      id: 1,
      contractId: 1,
      description: 'payment-1',
      value: 100,
      time: isoDate('2020-01-01'),
      isImported: false,
      createdAt: isoDate('2019-12-31'),
      updatedAt: isoDate('2019-12-31'),
      isDeleted: false,
    },
    {
      id: 2,
      contractId: 1,
      description: 'payment-2',
      value: 150,
      time: isoDate('2020-01-02'),
      isImported: false,
      createdAt: isoDate('2019-12-31'),
      updatedAt: isoDate('2019-12-31'),
      isDeleted: false,
    },
    {
      id: 3,
      contractId: 1,
      description: 'payment-3',
      value: -100,
      time: isoDate('2020-01-03'),
      isImported: false,
      createdAt: isoDate('2019-12-31'),
      updatedAt: isoDate('2019-12-31'),
      isDeleted: false,
    },
    {
      id: 4,
      contractId: 1,
      description: 'payment-4',
      value: 100,
      time: isoDate('2020-01-04'),
      isImported: false,
      createdAt: isoDate('2019-12-31'),
      updatedAt: isoDate('2019-12-31'),
      isDeleted: true,
    },
    {
      id: 5,
      contractId: 2,
      description: 'payment-5',
      value: 200,
      time: isoDate('2020-01-03'),
      isImported: false,
      createdAt: isoDate('2019-12-31'),
      updatedAt: isoDate('2019-12-31'),
      isDeleted: false,
    },
  ]);
}

function isoDate(value: string) {
  return new Date(value).toISOString();
}
