const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/listedesEmployes");

/**
 * @swagger
 * /api/employes/getting:
 *   get:
 *     summary: Obtenir la liste de tous les employés
 *     description: Endpoint pour obtenir la liste de tous les employés
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Liste de tous les employés
 */
router.get("/getting", employeeController.getAllEmployees);

/**
 * @swagger
 * /api/employes:
 *   post:
 *     summary: Créer un nouvel employé
 *     description: Endpoint pour créer un nouvel employé
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: employee
 *         description: Informations de l'employé à créer
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - position
 *             - department
 *           properties:
 *             name:
 *               type: string
 *               example: "John Doe"
 *             position:
 *               type: string
 *               example: "Developer"
 *             department:
 *               type: string
 *               example: "IT"
 *     responses:
 *       201:
 *         description: Employé créé avec succès
 */
router.post("/", employeeController.createEmployee);

/**
 * @swagger
 * /api/employes/delete/{id}:
 *   delete:
 *     summary: Supprimer un employé
 *     description: Endpoint pour supprimer un employé par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID de l'employé
 *     responses:
 *       200:
 *         description: Employé supprimé avec succès
 */
router.delete("/delete/:id", employeeController.deleteEmployee);

/**
 * @swagger
 * /api/employes/update/{id}:
 *   delete:
 *     summary: Modifier un employé
 *     description: Endpoint pour modifier un employé par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID de l'employé
 *     responses:
 *       200:
 *         description: Employé modifier avec succès
 */
router.patch("/update/:id", employeeController.updateEmployee);

module.exports = router;
