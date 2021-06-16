const bcrypt = require('bcryptjs');

exports.seed = async (knex) => {
  await knex('sales').del();
  await knex('inventory').del();

  await knex('colaborators')
    .del()
    .then(async () => {
      return await knex('colaborators').insert([
        {
          id:1,
          cpf: '00011122233',
          name: 'JOAO',
          lastname: 'DA SILVA',
          email: 'jsilva@caderninho.com.br',
          password: await bcrypt.hash('abc1234', 10),
          is_admin: true,
          is_deleted: false,
          created_at: new Date(),
        },
        {
          id:2,
          cpf: '44455566677',
          name: 'RENAN',
          lastname: 'BRITO',
          email: 'rbrito@inbnet.br',
          password: await bcrypt.hash('gremio', 10),
          is_admin: true,
          is_deleted: false,
          created_at: new Date(),
        },
        {
          id:3,
          cpf: '88899900011',
          name: 'CICLANDO',
          lastname: 'DE TAL',
          email: 'ctal@caderninho.com.br',
          password: await bcrypt.hash('abc1234', 10),
          is_admin: true,
          is_deleted: false,
          created_at: new Date(),
        },
      ]);
    });

  await knex('customers')
    .del()
    .then(async () => {
      return await knex('customers').insert([
        {
          id: 1,
          cpf: '00011122233',
          name: 'FULANO',
          lastname: 'DA SILVA',
          email: 'fulano@meuemail.com.br',
          telephone: '51977776666',
          is_deleted: false,
          created_at: new Date(),
        },
        {
          id: 2,
          cpf: '44455566677',
          name: 'MARIA',
          lastname: 'CALOTEIRA',
          email: 'caloteira@meuemail.com.br',
          telephone: '51988887777',
          is_deleted: false,
          created_at: new Date(),
        },
        {
          id: 3,
          cpf: '88899900011',
          name: 'PEDRO',
          lastname: 'PAGADOR',
          email: 'pedro@meuemail.com.br',
          telephone: '51911112222',
          is_deleted: false,
          created_at: new Date(),
        },
        {
          id: 4,
          cpf: '44455522210',
          name: 'JOCA',
          lastname: 'MAL',
          email: 'joca@meuemail.com.br',
          telephone: '51998887745',
          is_deleted: false,
          created_at: new Date(),
        },
        {
          id: 5,
          cpf: '33322211100',
          name: 'BILL',
          lastname: 'GATES',
          email: 'billwindows@micro.com',
          telephone: '51998887745',
          is_deleted: false,
          created_at: new Date(),
        },
      ]);
    });

  await knex('products')
    .del()
    .then(async () => {
      return await knex('products').insert([
        {
          id: 1,
          name: 'FARINHA DE TRIGO',
          product_brand: 'BOA',
          price: 3.59,
          is_deleted: false,
        },
        {
          id: 2,
          name: 'ERVA MATE',
          product_brand: 'VERDE',
          price: 9.58,
          is_deleted: false,
        },
        {
          id: 3,
          name: 'LEITE',
          product_brand: 'MIMOSA',
          price: 3.08,
          is_deleted: false,
        },
        {
          id: 4,
          name: 'REFRI',
          product_brand: 'PEPSI',
          price: 9.08,
          is_deleted: false,
        },
        {
          id: 5,
          name: 'CIGARRO',
          product_brand: 'BILL',
          price: 4.5,
          is_deleted: false,
        },
        {
          id: 6,
          name: 'MACARRAO',
          product_brand: 'MIOJO',
          price: 7.5,
          is_deleted: false,
        },
      ]);
    });

  await knex('sales')
    .del()
    .then(async () => {
      // Inserts seed entries
      return await knex('sales').insert([
        {
          id: 1,
          amount: 500,
          due_date: '2021-07-13',
          cpf_customer: '00011122233',
          cpf_colaborator: '44455566677',
          date_sale: '2021-06-13',
        },
        {
          id: 2,
          amount: 400,
          due_date: '2021-07-13',
          cpf_customer: '44455566677',
          cpf_colaborator: '44455566677',
          date_sale: '2021-06-13',
        },
        {
          id: 3,
          amount: 200,
          due_date: '2021-07-13',
          cpf_customer: '88899900011',
          cpf_colaborator: '44455566677',
          date_sale: '2021-06-13',
        },
      ]);
    });
  return await knex('sales_products')
    .del()
    .then(async () => {
      // Inserts seed entries
      return await knex('sales_products').insert([
        { id: 1, id_sale: 1, id_product: 1, qtd: 1 },
        { id: 2, id_sale: 1, id_product: 2, qtd: 1 },
        { id: 3, id_sale: 2, id_product: 3, qtd: 1 },
        { id: 4, id_sale: 2, id_product: 1, qtd: 1 },
        { id: 5, id_sale: 3, id_product: 2, qtd: 1 },
        { id: 6, id_sale: 3, id_product: 3, qtd: 1 },
      ]);
    });
};
