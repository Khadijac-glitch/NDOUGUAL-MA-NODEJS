// models/vente.js

const mongoose = require('mongoose');

const venteSchema = new mongoose.Schema({
   
    nomProduit: { type: String},
    prixProduit: { type: Number},
    nombreArticles: { type: Number},
    prixTotal: { type: Number},
    modePaiement: { type: String, enum: ['weave', 'orange-money', 'cash']}
});

module.exports = mongoose.model('Vente', venteSchema);
