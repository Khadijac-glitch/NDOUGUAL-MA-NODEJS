const express = require('express');
const newsletterController = require('../controllers/newsletters');

const router = express.Router();

/**
 * @swagger
 * /subscribe:
 *   post:
 *     summary: S'abonner à la newsletter
 *     description: Endpoint pour s'abonner à la newsletter
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: email
 *         description: Email de l'utilisateur à abonner à la newsletter
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: user@example.com
 *     responses:
 *       201:
 *         description: Abonnement réussi
 *       400:
 *         description: Erreur de validation
 */
router.post('/', newsletterController.subscribe);

module.exports = router;
