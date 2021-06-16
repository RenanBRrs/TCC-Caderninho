exports.up = async (knex) => {
  return await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('product_brand').notNullable();
    table.decimal('price').notNullable();
    table.boolean('is_deleted').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
  });
};

exports.down = async (knex) => {
  return await knex.schema.dropTable('products');
};
