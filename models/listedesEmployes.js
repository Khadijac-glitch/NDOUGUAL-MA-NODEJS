// Modèle d'employé
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    nom: String,
    poste: String,
    salaire: Number,
    horaire: Number,
    mensualite: Number
});

module.exports = mongoose.model('Employee', employeeSchema);
