const bcrypt = require('bcryptjs');

exports.seed = async (knex) => {
  await knex('sales_products').del();
  await knex('sales').del();
  await knex('colaborators').del();
  await knex('products').del();
  await knex('customers').del();

  await knex('colaborators').then(async () => {
    return await knex('colaborators').insert([
      {
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

  await knex('customers').then(async () => {
    return await knex('customers').insert([
      {
        cpf: '00011122233',
        name: 'FULANO',
        lastname: 'DA SILVA',
        email: 'fulano@meuemail.com.br',
        telephone: '51977776666',
        is_deleted: false,
        created_at: new Date(),
      },
      {
        cpf: '44455566677',
        name: 'MARIA',
        lastname: 'CALOTEIRA',
        email: 'caloteira@meuemail.com.br',
        telephone: '51988887777',
        is_deleted: false,
        created_at: new Date(),
      },
      {
        cpf: '88899900011',
        name: 'PEDRO',
        lastname: 'PAGADOR',
        email: 'pedro@meuemail.com.br',
        telephone: '51911112222',
        is_deleted: false,
        created_at: new Date(),
      },
      {
        cpf: '44455522210',
        name: 'JOCA',
        lastname: 'MAL',
        email: 'joca@meuemail.com.br',
        telephone: '51998887745',
        is_deleted: false,
        created_at: new Date(),
      },
      {
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

  const products = (
    await knex('products').then(async () => {
      return await knex('products')
        .insert([
          {
            name: 'FARINHA DE TRIGO',
            product_brand: 'BOA',
            price: 3.59,
            is_deleted: false,
          },
          {
            name: 'ERVA MATE',
            product_brand: 'VERDE',
            price: 9.58,
            is_deleted: false,
          },
          {
            name: 'LEITE',
            product_brand: 'MIMOSA',
            price: 3.08,
            is_deleted: false,
          },
          {
            name: 'REFRI',
            product_brand: 'PEPSI',
            price: 9.08,
            is_deleted: false,
          },
          {
            name: 'CIGARRO',
            product_brand: 'BILL',
            price: 4.5,
            is_deleted: false,
          },
          {
            name: 'MACARRAO',
            product_brand: 'MIOJO',
            price: 7.5,
            is_deleted: false,
          },
        ])
        .returning('id');
    })
  ).map((id) => parseInt(id));

  const sales = (
    await knex('sales').then(async () => {
      // Inserts seed entries
      return await knex('sales')
        .insert([
          {
            amount: 500,
            due_date: '2021-07-13',
            cpf_customer: '00011122233',
            cpf_colaborator: '44455566677',
            date_sale: '2021-06-13',
          },
          {
            amount: 400,
            due_date: '2021-07-13',
            cpf_customer: '44455566677',
            cpf_colaborator: '44455566677',
            date_sale: '2021-06-13',
          },
          {
            amount: 200,
            due_date: '2021-07-13',
            cpf_customer: '88899900011',
            cpf_colaborator: '44455566677',
            date_sale: '2021-06-13',
          },
        ])
        .returning('id');
    })
  ).map((id) => parseInt(id));

  const products_sale = sales
    .map((id, i) => {
      const aux = i === 0 ? 1 : i < 3 ? i * 2 : i;
      const a = { id_sale: id, id_product: products[aux], qtd: 1 };
      const b = {
        id_sale: id,
        id_product: products[aux < 6 ? aux + 1 : aux],
        qtd: 1,
      };
      return [a, b];
    })
    .reduce((arr, item) => [].concat(arr, item));
  return await knex('sales_products').insert(products_sale);
};
