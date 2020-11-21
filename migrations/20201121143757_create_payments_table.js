exports.up = function (knex) {
  return knex.schema.createTable('payments', function (table) {
    table.increments('id');
    table.string('description').defaultTo('');
    table.decimal('value').notNullable();
    table.datetime('time').notNullable();
    table.boolean('isImported').defaultTo(false);
    table.timestamp('createdAt').notNullable();
    table.timestamp('updatedAt').notNullable();
    table.boolean('isDeleted').defaultTo(false);
    // Foreign keys
    table.integer('contractId').unsigned().references('contracts.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('payments');
};
