const db = require('../database/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { user, password } = req.body;

    const userDb = await db('colaborators')
      .select('name', 'lastname', 'is_admin', 'password', 'cpf')
      .where('email', '=', user)
      .andWhere('is_deleted', '=', false);

    if (userDb.length < 1) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    const passwordDb = await bcrypt.compare(password, userDb[0].password);

    if (!passwordDb) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ cpf: userDb[0].cpf }, process.env.SECRET, {
      expiresIn: '12h',
    });

    delete userDb[0].password;
    // delete userDb[0].cpf;

    return res.status(200).json({
      auth: true,
      userDb,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Error when logging in' });
  }
};

exports.logout = async (req, res) => {
  return res.status(200).json({ auth: false, token: null });
};
