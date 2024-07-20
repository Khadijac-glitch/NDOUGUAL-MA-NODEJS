const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(403).json({ msg: 'autorisation refusée' });
    }
  
    try {
      const decode = jwt.verify(token, config.get('jwtSecret'));
      req.user = decode.user;
      next();
    } catch (err) {
      res.status(102).json({ msg: 'Token invalide' });
    }
  };



