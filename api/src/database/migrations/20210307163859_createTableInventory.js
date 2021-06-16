exports.up = async (knex) => {
  return await knex.schema.createTable('inventory', (table) => {
    table.increments('id').primary();
    table.decimal('amount').notNullable();
    table.string('type').notNullable();
    table.timestamp('moving_date').defaultTo(knex.fn.now());
    table.string('cpf_customer').notNullable();
    table.string('cpf_colaborators').notNullable();
    table.integer('id_product').notNullable();
    table.timestamp('date_sale').defaultTo(knex.fn.now());
    table.foreign('cpf_customer').references('cpf').inTable('customers');
    table.foreign('cpf_colaborators').references('cpf').inTable('colaborators');
    table.foreign('id_product').references('id').inTable('products');
  });
};

exports.down = async (knex) => {
  return await knex.schema.dropTable('inventory');
};
