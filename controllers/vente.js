// controllers/venteController.js

const Vente = require('../models/vente');

// GET /ventes - Récupérer toutes les ventes
exports.getVentes = async (req, res) => {
    try {
        const ventes = await Vente.find();
        res.status(200).json(ventes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET /ventes/:id - Récupérer une vente par son ID
exports.getVenteById = async (req, res) => {
    try {
        const vente = await Vente.findById(req.params.id);
        if (!vente) {
            return res.status(404).json({ message: 'Vente non trouvée' });
        }
        res.status(200).json(vente);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST /ventes - Créer une nouvelle vente
exports.creerVente = async (req, res) => {
    try {
        const nouvelleVente = new Vente(req.body);
        const venteEnregistree = await nouvelleVente.save();
        res.status(201).json(venteEnregistree);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// PUT /ventes/:id - Mettre à jour une vente existante
exports.mettreAJourVente = async (req, res) => {
    try {
        const vente = await Vente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vente) {
            return res.status(404).json({ message: 'Vente non trouvée' });
        }
        res.status(200).json(vente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE /ventes/:id - Supprimer une vente
exports.supprimerVente = async (req, res) => {
    try {
        const vente = await Vente.findByIdAndDelete(req.params.id);
        if (!vente) {
            return res.status(404).json({ message: 'Vente non trouvée' });
        }
        res.status(200).json({ message: 'Vente supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
