const Employee = require('../models/listedesEmployes');

// Méthodes du contrôleur pour gérer les employés
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createEmployee = async (req, res) => {
    const employee = new Employee({
        nom: req.body.nom,
        poste: req.body.poste,
        salaire: req.body.salaire,
        horaire: req.body.horaire,
        mensualite: req.body.mensualite
    });

    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Aucun employé trouvé avec cet ID" });
        }
        res.status(200).json({ message: "Employé supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Aucun employé trouvé avec cet ID" });
        }
        res.status(200).json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
