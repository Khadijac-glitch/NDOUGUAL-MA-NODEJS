const mongoose = require("mongoose");
const Send = require('../models/email');
const nodemailer = require('nodemailer');
const User = require("../models/register");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "passpartoutsn@gmail.com",
    pass: "afaq ywrb asby baky",
  },
});

exports.sendEmail = (req, res) => {
  const send = new Send(req.body);
  send()
    .then(() => {
      res.status(201).json({ message: 'Email envoyé avec succès' });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(403).json({ message: 'Erreur lors de l\'envoi de l\'email' });
    });
}

exports.registerUser = async (req, res) => {
  try {
    // Créer un nouvel utilisateur avec les données de la requête
    const newUser = new User(req.body);
    // Sauvegarder l'utilisateur dans la base de données
    const savedUser = await newUser.save();

    // Configurer les options de l'email
    const mailOptions = {
      from: "passpartoutsn@gmail.com",
      to: savedUser.email,
      subject: "Bienvenue chez TERANGA FOOD!",
      text: `Bonjour ${savedUser.firstName},\n\nMerci de vous !\n\nCordialement,\nL'équipe teranga`,
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès à " + savedUser.email);

    res.status(201).json({ message: 'Utilisateur enregistré avec succès et email envoyé' });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur ou de l'envoi de l'email:", error);
    res.status(403).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur ou de l\'envoi de l\'email' });
  }
};
