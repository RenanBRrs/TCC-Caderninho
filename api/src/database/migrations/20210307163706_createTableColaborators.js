exports.up = async (knex) => {
  return await knex.schema.createTable('colaborators', (table) => {
    table.increments('id').primary();
    table.string('cpf').unique().notNullable();
    table.string('name').notNullable();
    table.string('lastname').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('password_question');
    table.boolean('is_admin').notNullable();
    table.boolean('is_deleted').notNullable();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
    table.string('token');
  });
};

exports.down = async (knex) => {
  return await knex.schema.dropTable('colaborators');
};
