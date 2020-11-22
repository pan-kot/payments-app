import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('contracts', function (table) {
    table.increments('id');
    table.string('description').notNullable().defaultTo('');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('contracts');
}
