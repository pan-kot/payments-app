import knex from './knex';

import { PaymentDto } from './types';

export async function selectByContractIdAndTimeFrame(
  contractId: number,
  [from, to]: [Date, Date]
) {
  const model = knex
    .table('payments')
    .where({ isDeleted: false })
    .andWhere({ contractId })
    .andWhereBetween('time', [from.toISOString(), to.toISOString()]);

  const items = await model.clone().select();

  const [sumResult] = await model.clone().sum('value');
  const [sum] = Object.values(sumResult);

  return { items, sum };
}

export function addOne(payment: PaymentDto) {
  const { contractId, description, value, time, isImported } = payment;

  const now = new Date().toISOString();

  return knex('payments').insert({
    contractId,
    description,
    value,
    time: time.toISOString(),
    isImported,
    createdAt: now,
    updatedAt: now,
  });
}

export function updateOne(id: number, payment: PaymentDto) {
  const { contractId, description, value, time, isImported } = payment;

  const now = new Date().toISOString();

  return knex('payments').where({ id }).update({
    contractId,
    description,
    value,
    time: time.toISOString(),
    isImported,
    updatedAt: now,
  });
}

export function deleteOne(id: number) {
  return knex('payments').where({ id }).update({ isDeleted: true });
}
