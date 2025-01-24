const db = require('../config/db');

const getDepartments = async (req, res) => {
    try {
        const { status } = req.query;
        const query = status
            ? 'SELECT * FROM Department WHERE status = ?'
            : 'SELECT * FROM Department';
        const params = status ? [status] : [];
        const [departments] = await db.promise().query(query, params);
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addDepartment = async (req, res) => {
    try {
        const { name, status = 'active' } = req.body;

        // Validate input
        if (!name) {
            return res.status(400).json({ error: 'Department name is required' });
        }

        const query = 'INSERT INTO Department (name, status) VALUES (?, ?)';
        const [result] = await db.promise().query(query, [name, status]);

        res.status(201).json({ message: 'Department created successfully', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        // Validate input
        if (!name && !status) {
            return res.status(400).json({ error: 'At least one field is required to update' });
        }

        const query = 'UPDATE Department SET name = ?, status = ? WHERE id = ?';
        const [result] = await db.promise().query(query, [name, status, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.status(200).json({ message: 'Department updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM Department WHERE id = ?';
        const [result] = await db.promise().query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
};
