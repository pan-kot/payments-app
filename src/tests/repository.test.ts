import knex from '../repository/knex';

import * as repository from '../repository';

describe('repository:contracts', () => {
  beforeEach(async () => {
    await knex('contracts').truncate();
  });

  it('should insert and select contracts', async () => {
    await repository.contracts.addOne({ description: 'contract-1' });
    await repository.contracts.addOne({ description: 'contract-2' });

    const result = await repository.contracts.selectAll();

    expect(result).toEqual([
      { id: 1, description: 'contract-1' },
      { id: 2, description: 'contract-2' },
    ]);
  });
});

describe('repository:payments', () => {
  beforeEach(async () => {
    await knex('payments').truncate();

    await repository.contracts.addOne({ description: 'contract-1' });
    await repository.contracts.addOne({ description: 'contract-2' });
  });

  it('should insert and recieve payments by contract ID and time frame', async () => {
    await repository.payments.addOne({
      contractId: 1,
      description: 'payment-1',
      value: -100,
      time: new Date('2020-01-01'),
      isImported: false,
    });
    await repository.payments.addOne({
      contractId: 1,
      description: 'payment-2',
      value: 100,
      time: new Date('2020-01-02'),
      isImported: false,
    });
    await repository.payments.addOne({
      contractId: 1,
      description: 'payment-3',
      value: 100,
      time: new Date('2020-01-03'),
      isImported: false,
    });
    await repository.payments.addOne({
      contractId: 2,
      description: 'payment-3',
      value: -100,
      time: new Date('2020-01-03'),
      isImported: false,
    });
    await repository.payments.addOne({
      contractId: 1,
      description: 'payment-4',
      value: -100,
      time: new Date('2020-01-04'),
      isImported: false,
    });

    const result = await repository.payments.selectByContractIdAndTimeFrame(1, [
      new Date('2020-01-02'),
      new Date('2020-01-03'),
    ]);

    expect(result.items).toHaveLength(2);
    expect(result.sum).toBe(200);
  });

  it('should update selected payment', async () => {
    await repository.payments.addOne({
      contractId: 1,
      description: 'payment-1',
      value: -100,
      time: new Date('2020-01-01'),
      isImported: false,
    });
    await repository.payments.addOne({
      contractId: 1,
      description: 'payment-2',
      value: 100,
      time: new Date('2020-01-02'),
      isImported: false,
    });

    await repository.payments.updateOne(2, {
      contractId: 2,
      description: 'payment-2-updated',
      value: 200,
      time: new Date('2020-01-03'),
      isImported: true,
    });

    const result = await repository.payments.selectByContractIdAndTimeFrame(2, [
      new Date('2020-01-03'),
      new Date('2020-01-03'),
    ]);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].contractId).toBe(2);
    expect(result.items[0].description).toBe('payment-2-updated');
    expect(result.items[0].value).toBe(200);
    expect(result.items[0].time).toBe(new Date('2020-01-03').toISOString());
    expect(result.items[0].isImported).toBe(1);
  });

  it('should delete selected payment', async () => {
    await repository.payments.addOne({
      contractId: 1,
      description: 'payment-1',
      value: -100,
      time: new Date('2020-01-01'),
      isImported: false,
    });
    await repository.payments.addOne({
      contractId: 1,
      description: 'payment-2',
      value: 100,
      time: new Date('2020-01-02'),
      isImported: false,
    });

    await repository.payments.deleteOne(1);

    const result = await repository.payments.selectByContractIdAndTimeFrame(1, [
      new Date('2020-01-01'),
      new Date('2020-01-02'),
    ]);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBe(2);
  });
});
