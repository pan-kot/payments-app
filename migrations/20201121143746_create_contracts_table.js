exports.up = function (knex) {
  return knex.schema.createTable('contracts', function (table) {
    table.increments('id');
    table.string('description').notNullable().defaultTo('');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('contracts');
};
