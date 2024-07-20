const express = require('express');
const router = express.Router();
const sendEmail = require('../models/email'); 

router.post('/send', (req, res) => {
  const { to, subject, text } = req.body;

  sendEmail(to, subject, text)
    .then(() => {
      res.status(201).json({ message: 'Email envoyer avec success' });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(403).json({ message: ' Error email' });
    });
});

module.exports = router;



 
