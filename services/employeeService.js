const Employee = require('../models/employeeModel');
const { encryptPhoneNumber } = require('../utils/encryption');
const { validateEmployeeData } = require('../utils/validation')
const db = require('../config/db');

const employeeService = {
    getEmployees: async (page, limit) => {
        const offset = (page - 1) * limit;
        return await Employee.getAllEmployees(limit, offset);
    },

    addEmployee: async (data) => {
        console.log('req body', data);
        const { name, phone, email, department_id, salary, dob } = data;

        // Validation
        if (!validateEmployeeData(data)) {
            throw new Error('Validation failed');
        }
        data.phone = encryptPhoneNumber(phone); // Encrypt phone number

        // Check for duplicate employees
        const query = 'SELECT * FROM employee WHERE phone = ? OR email = ?';
        const [existingEmployee] = await db.promise().query(query, [data.phone, email]);

        if (existingEmployee.length > 0) {
            throw new Error('Duplicate employee');
        }

        return await Employee.addEmployee(data);
    },

    updateEmployee: async (id, data) => {
        console.log(data)
        if (!validateEmployeeData(data)) {
            throw new Error('Validation failed');
        }

        // Encrypt phone number before updating
        if (data.phone) {
            data.phone = encryptPhoneNumber(data.phone);

            const query = 'SELECT department_id, id, email FROM employee WHERE phone = ?';
            const [existingEmployee] = await db.promise().query(query, [data.phone]);

            if (existingEmployee.length > 0 && id !== existingEmployee[0].id) {
                throw new Error('Duplicate employee');
            }
        }

        return await Employee.updateEmployee(id, data);
    },

    deleteEmployee: async (id) => {
        return await Employee.deleteEmployee(id);
    },

    getStatistics: async () => {
        return await Employee.getStatistics();
    },
};




module.exports = employeeService;
