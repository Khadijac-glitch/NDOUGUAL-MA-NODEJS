const express = require('express');
const { forgotPassword, resetPassword } = require('../controllers/forgotpassword');
const { check } = require('express-validator');

const router = express.Router();

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Mot de passe oublié
 *     description: Endpoint pour demander une réinitialisation de mot de passe
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: email
 *         description: Email de l'utilisateur
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "example@example.com"
 *     responses:
 *       200:
 *         description: Email envoyé avec succès pour réinitialisation
 */
router.post('/forgot-password', [
  check('email', 'Veuillez fournir un email valide').isEmail()
], forgotPassword);





/**
 * @swagger
 * /api/reset-password/{token}:
 *   post:
 *     summary: Réinitialiser le mot de passe
 *     description: Endpoint pour réinitialiser le mot de passe avec un token
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         type: string
 *         description: Token de réinitialisation de mot de passe
 *       - in: body
 *         name: password
 *         description: Nouveau mot de passe et confirmation
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               example: "newpassword123"
 *             confirmPassword:
 *               type: string
 *               example: "newpassword123"
 *     responses:
 *       200:
 *         description: Mot de passe réinitialisé avec succès
 */
router.post('/reset-password/:token', [
  check('password', 'Le mot de passe doit contenir au moins 6 caractères').isLength({ min: 6 }),
  check('confirmPassword', 'Les mots de passe doivent correspondre').custom((value, { req }) => value === req.body.password)
], resetPassword);


module.exports = router;
