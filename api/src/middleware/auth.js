const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === null || token === undefined) {
    return res.status(401).json({ error: 'Token is null' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: 'Invalid token' });
    }
    req.body.cpf_colaborator = decoded.cpf;
  });
  return next();
};
