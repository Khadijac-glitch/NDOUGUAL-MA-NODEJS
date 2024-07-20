const { check, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/register");


/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Endpoint pour permettre aux utilisateurs de se connecter
 *     operationId: userLogin
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Email et mot de passe de l'utilisateur
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: exemple@domaine.com
 *             password:
 *               type: string
 *               format: password
 *               example: votremotdepasse
 *     responses:
 *       201:
 *         description: Connexion réussie
 *         schema:
 *           type: string
 *           example: Connexion réussie
 *       401:
 *         description: utilisateur non authentifié 
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   msg:
 *                     type: string
 *                     example: Email invalide
 *       404:
 *         description: Erreur du serveur
 *         schema:
 *           type: string
 *           example: Erreur du serveur
 */

router.post(
  "/",
  [
    check("email", "Veuillez entrer un email valide").isEmail(),
    check("password", "Veuillez entrer un mot de passe valide").exists(),
  ],

  (exports.userLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(403).json({ errors: [{ msg: "Email invalide" }] });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      console.log(user.password);
      if (!isPasswordValid) {
        return res
          .status(403)
          .json({ errors: [{ msg: "Mot de passe invalide" }] });

      }

      // console.log("Connexion réussie");
      // res.send("Connexion réussie");
      return res.status(201).json({ firstName: user.firstName, lastName: user.lastName ,email:user.email, _id:user._id });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur du serveur");
    }
  })
);
module.exports = router;
