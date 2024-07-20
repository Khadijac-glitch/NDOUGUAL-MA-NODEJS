// routes/venteRoutes.js

const express = require('express');
const router = express.Router();
const venteController = require('../controllers/vente');

// GET /ventes - Récupérer toutes les ventes
router.get('/', venteController.getVentes);

// GET /ventes/:id - Récupérer une vente par son ID
router.get('/:id', venteController.getVenteById);

// POST /ventes - Créer une nouvelle vente
router.post('/', venteController.creerVente);

// PUT /ventes/:id - Mettre à jour une vente existante
router.put('/:id', venteController.mettreAJourVente);

// DELETE /ventes/:id - Supprimer une vente
router.delete('/:id', venteController.supprimerVente);

module.exports = router;
