const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const ProdCtrl = require("../controllers/register");
const PradCtrl = require("../controllers/email");
const auth = require("../middleware/auth");

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Endpoint pour créer un nouvel utilisateur
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Informations de l'utilisateur à créer
 *         schema:
 *           type: object
 *           required:
 *             - firstName
 *             - lastName
 *             - email
 *             - number
 *             - password
 *           properties:
 *             firstName:
 *               type: string
 *               example: John
 *             lastName:
 *               type: string
 *               example: Doe
 *             email:
 *               type: string
 *               format: email
 *               example: john.doe@example.com
 *             number:
 *               type: string
 *               example: "0123456789"
 *             password:
 *               type: string
 *               example: "password123"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post(
  "/",
  [
    check("firstName", "Veuillez entrer votre prénom").not().isEmpty(),
    check("lastName", "Veuillez entrer votre nom").not().isEmpty(),
    check("email", "Veuillez entrer un email valide").isEmail(),
    check("number", "Veuillez entrer votre numéro").not().isEmpty(),
    check("password", "Veuillez entrer un mot de passe de 6 caractères ou plus").isLength({ min: 6 }),
  ],
  ProdCtrl.createUser
);

/**
 * @swagger
 * /api/register/getting:
 *   get:
 *     summary: Obtenir un utilisateur
 *     description: Endpoint pour obtenir les informations d'un utilisateur
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur
 */
router.get("/getting", ProdCtrl.getOneUser);

/**
 * @swagger
 * /api/register/update/{id}:
 *   patch:
 *     summary: Mettre à jour un utilisateur
 *     description: Endpoint pour mettre à jour les informations d'un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID de l'utilisateur
 *       - in: body
 *         name: user
 *         description: Informations de l'utilisateur à mettre à jour
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             number:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       400:
 *         description: Erreur de validation
 */
router.patch("/update/:id", ProdCtrl.patchUser);

/**
 * @swagger
 * /api/register/delete/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Endpoint pour supprimer un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 */
router.delete("/delete/:id", ProdCtrl.deleteUser);

/**
 * @swagger
 * /api/register/admin-register:
 *   post:
 *     summary: Créer un nouvel administrateur
 *     description: Endpoint pour créer un nouvel administrateur
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: admin
 *         description: Informations de l'administrateur à créer
 *         schema:
 *           type: object
 *           required:
 *             - firstName
 *             - lastName
 *             - email
 *             - number
 *             - password
 *           properties:
 *             firstName:
 *               type: string
 *               example: John
 *             lastName:
 *               type: string
 *               example: Doe
 *             email:
 *               type: string
 *               format: email
 *               example: john.doe@example.com
 *             number:
 *               type: string
 *               example: "0123456789"
 *             password:
 *               type: string
 *               example: "password123"
 *     responses:
 *       201:
 *         description: Administrateur créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post("/admin-register", ProdCtrl.createAdminUser);

/**
 * @swagger
 * /api/register/update-admin/{id}:
 *   patch:
 *     summary: Mettre à jour un administrateur
 *     description: Endpoint pour mettre à jour les informations d'un administrateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID de l'administrateur
 *       - in: body
 *         name: admin
 *         description: Informations de l'administrateur à mettre à jour
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             number:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Administrateur mis à jour avec succès
 *       400:
 *         description: Erreur de validation
 */
router.patch("/update-admin/:id", ProdCtrl.patchAdmin);

/** 
 * @swagger
 * /api/register/delete-admin/{id}:
 *   delete:
 *     summary: Supprimer un administrateur
 *     description: Endpoint pour supprimer un administrateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID de l'administrateur
 *     responses:
 *       200:
 *         description: Administrateur supprimé avec succès
 */
router.delete("/delete-admin/:id", ProdCtrl.deleteAdmin);

// /** 
//  * @swagger
//  * /api/register/email-admin:
//  *   post:
//  *     summary: Envoyer un email administrateur
//  *     description: Endpoint pour envoyer un email administrateur
//  *     consumes:
//  *       - application/json
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - in: body
//  *         name: email
//  *         description: Détails de l'email à envoyer
//  *         schema:
//  *           type: object
//  *           required:
//  *             - to
//  *             - subject
//  *             - text
//         properties:
//  *             to:
//  *               type: string
//  *               example: destinataire@domaine.com
//  *             subject:
//  *               type: string
//  *               example: Sujet de l'email
//  *             text:
//  *               type: string
//  *               example: Contenu de l'email
//  *     responses:
//  *       201:
//  *         description: Email envoyé avec succès
//  *      500:
//  *         description: Erreur lors de l'envoi de l'email
//  */
// router.post("/email-admin/", PradCtrl.sendEmail);


/**
 * @swagger
 * /api/register/email-admin:
 *   post:
 *     summary: Envoyer un email administrateur
 *     description: Endpoint pour envoyer un email administrateur
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: email
 *         description: Détails de l'email à envoyer
 *         schema:
 *           type: object
 *           required:
 *             - to
 *             - subject
 *             - text
 *           properties:
 *             to:
 *               type: string
 *               example: destinataire@domaine.com
 *             subject:
 *               type: string
 *               example: Sujet de l'email
 *             text:
 *               type: string
 *               example: Contenu de l'email
 *     responses:
 *       201:
 *         description: Email envoyé avec succès
 *       500:
 *         description: Erreur lors de l'envoi de l'email
 */
router.post("/email-admin/", PradCtrl.sendEmail);


module.exports = router;