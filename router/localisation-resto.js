const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /localisation:
 *   get:
 *     summary: Obtenir la localisation du restaurant
 *     description: Endpoint pour obtenir la localisation actuelle du restaurant
 *     operationId: getLocalisation
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Localisation du restaurant
 *         schema:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               example: 14.7437625
 *             longitude:
 *               type: number
 *               example: -17.4557196
 */
router.get("/localisation", (req, res) => {
  const location = {
    latitude: 14.7437625,
    longitude: -17.4557196,
  };
  res.json(location);
});

module.exports = router;
