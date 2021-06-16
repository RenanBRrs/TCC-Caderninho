const db = require('../database/database');

exports.createSale = async (req, res) => {
  try {
    const { amount, due_date, customer, colaborator, date_sale, products } =
      req.body;
    const cpf_customer = customer.cpf;
    const cpf_colaborator = colaborator.cpf;
    const sale = {
      amount,
      due_date,
      cpf_colaborator,
      cpf_customer,
      date_sale,
    };
    const trx = await db.transaction();
    const id_sale = await trx('sales').insert(sale).returning('id');
    const products_id = products.map((product) => {
      return {
        id_sale: parseInt(id_sale),
        id_product: product.id,
        qtd: product.qtd,
      };
    });
    await trx('sales_products').insert(products_id);
    await trx.commit();
    return res.status(200).json({ id_sale, message: 'successful sale' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Unprocessed sale' });
  }
};

exports.showSales = async (req, res) => {
  try {
    const sales = await db('sales').select('*');
    return res.status(200).json(sales);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error in database');
  }
};

exports.indexSale = async (req, res) => {
  try {
    const id = req.params.id.replace(/\D/g, '');
    const sale = await db('sales').where('id', '=', id).select('*').first();

    if (sale === undefined || sale.length === 0) {
      return res.status(406).json({ message: 'Sale not found' });
    } else {
      return res.status(200).json(sale);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error in database');
  }
};
