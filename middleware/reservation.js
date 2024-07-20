const jwt = require('jsonwebtoken');

module.exports =function verifyToken(req, res, next)  {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
  
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé' });
    }
  
    jwt.verify(token, 'votre_clé_secrète', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Jeton non valide' });
      }
      req.user = user; 
      next(); 
    });
  };
