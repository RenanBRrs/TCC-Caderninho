const db = require('../database/database');
const bcrypt = require('bcryptjs');

exports.createColaborator = async (req, res) => {
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
    const password = await bcrypt.hash(req.body.password, 10);
    const is_admin = req.body.is_admin;

    const id = await db('colaborators')
      .insert({
        cpf,
        name,
        lastname,
        email,
        password,
        is_admin,
        is_deleted: false,
        created_at: new Date(),
      })
      .returning('id');
    return res
      .status(200)
      .json({ id: id[0], message: 'Collaborator saved successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Error saving collaborator' });
  }
};

exports.showColaborators = async (req, res) => {
  try {
    const colaborators = await db('colaborators')
      .select('id', 'cpf', 'name', 'lastname', 'email')
      .where('is_deleted', '=', false);
    return res.status(200).json(colaborators);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error in database');
  }
};

exports.deleteColaborator = async (req, res) => {
  try {
    const email = req.params.email
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const colaborator = await db('colaborators')
      .where('email', '=', email)
      .update({ is_deleted: true, deleted_at: new Date().toLocaleString() })
      .returning();
    if (colaborator === 0) {
      return res.status(406).json({ message: 'Collaborator not found' });
    }
    return res
      .status(200)
      .json({ email, message: 'Collaborator deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Error deleting collaborator' });
  }
};

exports.indexColaborator = async (req, res) => {
  try {
    const email = req.params.email
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const colaborator = await db('colaborators')
      .where('email', '=', email)
      .select('id', 'cpf', 'name', 'lastname', 'email', 'is_deleted')
      .first();
    console.log({ colaborator, email });
    if (colaborator === undefined || colaborator.length === 0) {
      return res.status(406).json({ message: 'Collaborator not found' });
    } else {
      return res.status(200).json(colaborator);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error in database');
  }
};

exports.colaboratorsIsDeleted = async (req, res) => {
  try {
    const colaborators = await db('colaborators')
      .select(
        'id',
        'cpf',
        'name',
        'lastname',
        'email',
        'is_deleted',
        'updated_at',
        'deleted_at',
      )
      .where('is_deleted', '=', true);
    return res.status(200).json(colaborators);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error in database');
  }
};

exports.reactivateCollaborator = async (req, res) => {
  try {
    const email = req.params.email
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const colaborator = await db('colaborators')
      .where('email', '=', email)
      .update({ is_deleted: false, deleted_at: null })
      .returning();
    if (colaborator === 0) {
      return res.status(406).json({ message: 'Collaborator not found' });
    }
    return res
      .status(200)
      .json({ email, message: 'Collaborator reactivated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Error reactivated collaborator' });
  }
};

exports.updateColaborator = async (req, res) => {
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
    const password = await bcrypt.hash(req.body.password, 10);
    const is_admin = req.body.is_admin;

    const customer = await db('colaborators')
      .where('cpf', '=', cpf)
      .update({ cpf, name, lastname, email, password, is_admin });

    if (customer === 0) {
      return res.status(406).json({ message: 'Colaborator not updated' });
    }
    return res
      .status(200)
      .json({ cpf, message: 'Colaborator updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Error update colaborator' });
  }
};

exports.newId = async (req, res) => {
  try {
    const { max } = await db('colaborators').max('id');
    return res.status(200).json({ id: max + 1 });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
