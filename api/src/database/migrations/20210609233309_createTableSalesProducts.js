exports.up = async (knex) => {
  return await knex.schema.createTable('sales_products', (table) => {
    table.increments('id').primary();
    table.integer('id_sale').notNullable();
    table.integer('id_product').notNullable();
    table.decimal('qtd').notNullable();
    table.foreign('id_sale').references('id').inTable('sales');
    table.foreign('id_product').references('id').inTable('products');
  });
};

exports.down = async (knex) => {
  return await knex.schema.dropTable('sales_products');
};
