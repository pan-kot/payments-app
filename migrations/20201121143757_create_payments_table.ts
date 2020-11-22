import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('payments', function (table) {
    table.increments('id');
    table.string('description').defaultTo('');
    table.decimal('value').notNullable();
    table.dateTime('time').notNullable();
    table.boolean('isImported').defaultTo(false);
    table.timestamp('createdAt').notNullable();
    table.timestamp('updatedAt').notNullable();
    table.boolean('isDeleted').defaultTo(false);
    // Foreign keys
    table.integer('contractId').unsigned().references('contracts.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('payments');
}
