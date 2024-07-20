const express = require("express");
const Produit = require("../models/product");
const router = express.Router();
const upload = require("../multer.js"); // Chemin vers la configuration multer



/**
 * @swagger
 * /admin/liste-produits:
 *   post:
 *     summary: Ajouter un produit
 *     description: Ajouter un nouveau produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image: 
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       500:
 *         description: Erreur du serveur
 */
router.post("/liste-produits", async (req, res, next) => {
  try {
    const produit = new Produit(req.body);
    const saveProduit = await produit.save();
    res.status(201).send(saveProduit);
  } catch (e) {
    res.status(404).send(e);
  }
  
  }
);

/**
 * @swagger
 * /admin/liste-produits:
 *   get:
 *     summary: Voir la liste de tous les produits
 *     description: Obtenir une liste de tous les produits
 *     responses:
 *       201:
 *         description: Succès
 *       500:
 *         description: Erreur du serveur
 */
router.get("/liste-produits", async (req, res, next) => {
  try {
    const produits = await Produit.find({});
    res.send(produits);
  } catch (e) {
    res.status(404).send(e);
  }
});

/**
 * @swagger
 * /admin/liste-produits/{id}:
 *   get:
 *     summary: Voir les détails d'un produit
 *     description: Obtenir les détails d'un produit par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur du serveur
 */
router.get("/liste-produits/:id", async (req, res, next) => {
  const produitId = req.params.id;
  try {
    const produits = await Produit.findById(produitId);
    if (!produits) return res.status(404).send("Produit non trouvé");
    res.send(produits);
  } catch (e) {
    res.status(404).send(e);
  }
});



// Route pour mettre à jour un produit avec une nouvelle image

/**
 * @swagger
 * /admin/liste-produits/{id}:
 *   patch:
 *     summary: Modifier un produit
 *     description: Modifier les détails d'un produit par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur du serveur
 */
router.patch("/liste-produits/:id", async (req, res, next) => {
  const produitId = req.params.id;
  try {
    const produits = await Produit.findByIdAndUpdate(produitId, req.body, {
      new: true,
    });
    if (!produits) return res.status(404).send("Produit non trouvé");
    res.send(produits);
  } catch (e) {
    res.status(404).send(e);
  }
}
);


/**
 * @swagger
 * /admin/liste-produits/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     description: Supprimer un produit par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur du serveur
 */
router.delete("/liste-produits/:id", async (req, res, next) => {
  const produitId = req.params.id;
  try {
    const produits = await Produit.findByIdAndDelete(produitId);
    if (!produits) return res.status(404).send("Produit non trouvé");
    res.send(produits);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;