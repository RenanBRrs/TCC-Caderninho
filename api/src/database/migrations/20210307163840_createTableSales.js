exports.up = async (knex) => {
  return await knex.schema.createTable('sales', (table) => {
    table.increments('id').primary();
    table.decimal('amount').notNullable();
    table.date('due_date').notNullable();
    table.string('cpf_customer').notNullable();
    table.string('cpf_colaborator').notNullable();
    table.timestamp('date_sale').defaultTo(knex.fn.now());
    table.foreign('cpf_customer').references('cpf').inTable('customers');
    table.foreign('cpf_colaborator').references('cpf').inTable('colaborators');
  });
};

exports.down = async (knex) => {
  return await knex.schema.dropTable('sales');
};
