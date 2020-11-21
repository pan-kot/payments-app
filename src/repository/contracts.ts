import knex from './knex';

import { ContractDto } from './types';

export function selectAll() {
  return knex.select().from('contracts');
}

export function addOne(contract: ContractDto) {
  const { description } = contract;

  return knex('contracts').insert({ description });
}
