import knex from './knex';

import { Payment } from '../model';
import { PaymentDto } from './types';

export async function selectByContractIdAndTimeFrame(
  contractId: number,
  [from, to]: [Date, Date]
): Promise<{ items: Payment[]; sum: number }> {
  const model = knex
    .table('payments')
    .where({ isDeleted: false })
    .andWhere({ contractId })
    .andWhereBetween('time', [from.toISOString(), to.toISOString()]);

  const items = await model.clone().select();

  const [sumResult] = await model.clone().sum('value');
  const [_sum] = Object.values(sumResult);
  const sum = typeof _sum === 'number' ? _sum : 0;

  return { items, sum };
}

export async function addOne(payment: PaymentDto) {
  const { contractId, description, value, time, isImported } = payment;

  const now = new Date().toISOString();

  const [id] = await knex('payments').insert({
    contractId,
    description,
    value,
    time: time.toISOString(),
    isImported,
    createdAt: now,
    updatedAt: now,
  });

  return id;
}

export async function updateOne(id: number, payment: PaymentDto) {
  const { contractId, description, value, time, isImported } = payment;

  const now = new Date().toISOString();

  const status = await knex('payments').where({ id }).update({
    contractId,
    description,
    value,
    time: time.toISOString(),
    isImported,
    updatedAt: now,
  });

  return Boolean(status);
}

export async function deleteOne(id: number) {
  const status = await knex('payments')
    .where({ id })
    .update({ isDeleted: true });

  return Boolean(status);
}
