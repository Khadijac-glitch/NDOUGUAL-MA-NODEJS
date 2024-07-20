
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); 
const User = require("../models/register");
const nodemailer = require('nodemailer');

// Configurez Nodemailer avec vos paramètres
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "passpartoutsn@gmail.com",
    pass: "afaq ywrb asby baky",
  }
});

// Fonction pour envoyer l'email de confirmation
const sendConfirmationEmail = (email, confirmationLink) => {
  const mailOptions = {
    from: 'passpartoutsn@gmail.com',
    to: email,
    subject: 'Confirmation d\'inscription',
    html: `
      <p>Merci de vous être inscrit ! Veuillez confirmer votre adresse email en cliquant sur le lien ci-dessous :</p>
      <a href="${confirmationLink}">Confirmer mon adresse email</a>
    `
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error);
    } else {
      console.log('Email de confirmation envoyé: ' + info.response);
    }
  });
};

// Contrôleur pour l'inscription d'un nouvel utilisateur
exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({ errors: errors.array() });
    }
  
    const { firstName, lastName, email, number, password, confirmPassword, role } = req.body;
  
    try {
      let user = await User.findOne({ email });
  
      if (user) {
        return res.status(301).json({ errors: [{ msg: 'Utilisateur existe déjà' }] });
      }
  
      // Crypter le mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Créer un nouvel utilisateur
      user = new User({
        firstName,
        lastName,
        email,
        number,
        password: hashedPassword,
        confirmPassword,
        role
      });
  
      // Enregistrer l'utilisateur dans la base de données
      await user.save();
  
      // Générer un token JWT
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        "your_jwt_secret",
        { expiresIn: '1h' } // Durée de validité du token (1 heure dans cet exemple)
      );
  
      // Construire le lien de confirmation avec le token
      const confirmationLink = `http://localhost:8080/api/auth?token=${token}`;
  
      // Envoi de l'email de confirmation
      sendConfirmationEmail(user.email, confirmationLink);
  
      // Répondre avec un message de succès
      return res.status(201).json({ msg: 'Inscription réussie. Un email de confirmation a été envoyé à votre adresse.' });
  
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Erreur du serveur');
    }
};

// Fonction pour envoyer l'email de confirmation
// function sendConfirmationEmail(userEmail, confirmationLink) {
//   const mailOptions = {
//     from: 'passpartoutsn@gmail.com',
//     to: userEmail,
//     subject: 'Confirmation d\'inscription',
//     html: `<p>Merci de vous être inscrit ! Veuillez confirmer votre inscription en suivant ce <a href="${confirmationLink}">lien</a>.</p>`
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email de confirmation envoyé: ' + info.response);
//     }
//   });
// }


// // Fonction pour envoyer l'email de confirmation
// function sendConfirmationEmail(userEmail, confirmationLink) {
//   const mailOptions = {
//     from: 'passpartoutsn@gmail.com',
//     to: userEmail,
//     subject: 'Confirmation d\'inscription',
//     html: `<p>Merci de vous être inscrit ! Veuillez confirmer votre inscription en suivant ce <a href="${confirmationLink}">lien</a>.</p>`
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error);
//     } else {
//       console.log('Email de confirmation envoyé: ' + info.response);
//     }
//   });
// }


exports.getOneUser = (req, res) => {
  const user = req.params.id;
  console.log(user);
  User.find({ user: user })
    .then((utilisateur) => {
      return res.status(201).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(403).json({ error });
    });
};

exports.patchUser = (req, res) => {
  const user = req.params.id;
  console.log(user);
  User.findByIdAndUpdate(user, req.body, {
    new: true,
    runValidators: true,
  })
    .then((utilisateur) => {
      return res.status(201).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(403).json({ error });
    });
};
//   ADMIN
exports.createAdminUser = (req, res) => {
    const user = new User(req.body);
    user.role = "admin";
    user
      .save()
      .then((utilisateur) => {
        const token = jwt.sign(
          { id: utilisateur._id, role: utilisateur.role },
          "secret_key",
          { expiresIn: "1h" }
        );
        return res.status(201).json({ utilisateur, token });
      })
      .catch((error) => {
        return res.status(403).json({ error });
      });
  };
exports.patchAdmin = (req, res) => {
  const user = req.params.id;
  console.log(user);
  User.findByIdAndUpdate(user, req.body, {
    new: true,
    runValidators: true,
  })
    .then((utilisateur) => {
      return res.status(201).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(403).json({ error });
    });
};
exports.deleteUser = (req, res) => {
  const user = req.params.id;
  console.log(user);
  User.findByIdAndDelete(user)
    .then((utilisateur) => {
      return res.status(201).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(403).json({ error });
    });
};
exports.deleteAdmin = (req, res) => {
  const user = req.params.id;
  console.log(user);
  User.findByIdAndDelete(user)
    .then((utilisateur) => {
      return res.status(201).json({ utilisateur });
    })
    .catch((error) => {
      console.log(error);
      return res.status(403).json({ error });
    });
};
