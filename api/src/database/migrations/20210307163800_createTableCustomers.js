exports.up = async (knex) => {
  return await knex.schema.createTable('customers', (table) => {
    table.increments('id').primary();
    table.string('cpf').unique().notNullable();
    table.string('name').notNullable();
    table.decimal('amount_owed');
    table.string('lastname').notNullable();
    table.string('email').unique().notNullable();
    table.string('telephone').notNullable();
    table.boolean('is_deleted').notNullable();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
};

exports.down = async (knex) => {
  return await knex.schema.dropTable('customers');
};
