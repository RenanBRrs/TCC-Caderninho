const db = require('../database/database');

exports.createCustomer = async (req, res) => {
  try {
    const cpf = req.body.cpf.replace(/\D/g, '');
    const name = req.body.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
    const lastname = req.body.lastname
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
    const email = req.body.email
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const telephone = req.body.telephone.replace(/\D/gi, '');

    const data = await db('customers')
      .insert({
        cpf,
        name,
        lastname,
        email,
        telephone,
        is_deleted: false,
        created_at: new Date(),
      })
      .returning([
        'id',
        'cpf',
        'name',
        'lastname',
        'email',
        'telephone',
        'is_deleted',
      ]);

    return res.status(200).json({
      id: data[0].id,
      cpf: data[0].cpf,
      name: data[0].name,
      lastname: data[0].lastname,
      email: data[0].email,
      telephone: data[0].telephone,
      is_deleted: data[0].is_deleted,
      message: 'Customer saved successfully',
    });
  } catch (error) {
    return res.status(403).json({ error: error.detail });
  }
};

exports.showCustomers = async (req, res) => {
  try {
    const customers = await db('customers').select(
      'id',
      'cpf',
      'name',
      'lastname',
      'email',
      'telephone',
      'amount_owed',
      'is_deleted',
    );
    // .where('is_deleted', '=', false);
    return res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error in database');
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const cpf = req.params.cpf.replace(/\D/g, '');
    const customer = await db('customers')
      .where('cpf', '=', cpf)
      .update({ is_deleted: true, deleted_at: new Date().toLocaleString() })
      .returning();
    if (customer === 0) {
      return res.status(406).json({ message: 'Customer not found' });
    }
    return res
      .status(200)
      .json({ cpf, message: 'Customer deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Error deleting customer' });
  }
};

exports.indexCustomer = async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const custormer = await db('customers')
      .where('cpf', '=', cpf)
      .select(
        'id',
        'cpf',
        'name',
        'lastname',
        'email',
        'telephone',
        'amount_owed',
        'is_deleted',
      )
      .first();

    if (custormer === undefined || custormer.length === 0) {
      return res.status(406).json({ message: 'Customer not found' });
    } else {
      return res.status(200).json(custormer);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error in database');
  }
};

exports.customersIsDeleted = async (req, res) => {
  try {
    const customers = await db('customers')
      .select(
        'id',
        'cpf',
        'name',
        'lastname',
        'email',
        'telephone',
        'is_deleted',
        'deleted_at',
      )
      .where('is_deleted', '=', true);
    return res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error in database');
  }
};

exports.reactivateCustomer = async (req, res) => {
  try {
    const cpf = req.params.cpf.replace(/\D/g, '');
    const customer = await db('customers')
      .where('cpf', '=', cpf)
      .update({ is_deleted: false, deleted_at: null })
      .returning();
    if (customer === 0) {
      return res.status(406).json({ message: 'Customer not found' });
    }
    return res
      .status(200)
      .json({ cpf, message: 'Customer reactivated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Error reactivated customer' });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const cpf = req.params.cpf.replace(/\D/g, '');
    const name = req.body.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
    const lastname = req.body.lastname
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
    const email = req.body.email
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const telephone = req.body.telephone.replace(/\D/gi, '');

    const customer = await db('customers')
      .where('cpf', '=', cpf)
      .update({ cpf, name, lastname, email, telephone });

    if (customer === 0) {
      return res.status(406).json({ message: 'Customer not updated' });
    }
    return res
      .status(200)
      .json({ cpf, message: 'Customer updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Error update customer' });
  }
};

exports.newId = async (req, res) => {
  try {
    const { max } = await db('customers').max('id').first();
    return res.status(200).json({ id: max + 1 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
