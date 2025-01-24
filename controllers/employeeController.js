const employeeService = require('../services/employeeService');

const getEmployees = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const employees = await employeeService.getEmployees(page, limit);

        // Note: If we want to phone also so we need to use decriptPhoneNumber function for decript phone.

        res.status(200).json(employees);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

const addEmployee = async (req, res) => {
    try {
        const data = req.body;
        const result = await employeeService.addEmployee(data);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await employeeService.updateEmployee(id, data);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await employeeService.deleteEmployee(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getStatistics = async (req, res) => {
    try {
        const statistics = await employeeService.getStatistics();
        res.status(200).json(statistics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getStatistics,
};
