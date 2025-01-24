const db = require('../config/db');

const Employee = {
    getAllEmployees: async (limit, offset) => {
        const query = 'SELECT id, name, dob, email, status, created, salary, department_id FROM employee LIMIT ? OFFSET ?';
        const [rows] = await db.promise().query(query, [limit, offset]);
        return rows;
    },

    addEmployee: async (data) => {
        const query = 'INSERT INTO employee SET ?';
        const departmentQuery = 'INSERT INTO department SET ?';

        const [department_result] = await db.promise().query(departmentQuery, { name: data.department_name });

        // console.log('result==>', department_result)
        delete data.department_name;
        data.department_id = department_result.insertId;

        const [result] = await db.promise().query(query, data);
        // console.log('=====>', result);
        return result;
    },

    updateEmployee: async (id, data) => {
        const query = 'UPDATE employee SET ? WHERE id = ?';
        const query1 = `SELECT department_id,status FROM employee WHERE id = ${id}`;
        const [employee_data] = await db.promise().query(query1);
        // console.log('11111111', employee_data);
        if (data.status && data.status !== employee_data[0].status) {
            await db.promise().query('UPDATE department SET ? WHERE id = ?', [{ status: data.status }, employee_data[0].department_id])
        }
        const [result] = await db.promise().query(query, [data, id]);
        // console.log('==', result)
        return result;
    },

    deleteEmployee: async (id) => {
        const query = `SELECT department_id FROM employee WHERE id = ${id}`;
        const [employee_data] = await db.promise().query(query);

        const query1 = 'DELETE FROM employee WHERE id = ?';
        const query2 = 'DELETE FROM department WHERE id = ?';

        await db.promise().query(query2, [employee_data[0].department_id]);

        const [result] = await db.promise().query(query1, [id]);
        return result;
    },

    getStatistics: async () => {

        const query1 = `SELECT d.name AS department_name, MAX(e.salary) AS highest_salary FROM employee e JOIN department d ON e.department_id = d.id GROUP BY d.name;`

        const query2 = `SELECT CASE
      WHEN salary BETWEEN 0 AND 50000 THEN '0-50000'
      WHEN salary BETWEEN 50001 AND 100000 THEN '50001-100000'
      ELSE '100000+'
    END AS salary_range, COUNT(*) AS employee_count
    FROM employee GROUP BY salary_range;`

        const query3 = `SELECT department_id, name, TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age FROM employee WHERE department_id IS NOT NULL ORDER BY department_id, dob LIMIT 1;`;
        const [results1] = await db.promise().query(query1);
        const [results2] = await db.promise().query(query2);
        const [results3] = await db.promise().query(query3);

        const results = {
            highest_salary_employee: results1,
            salary_range_employee: results2,
            youngest_employee: results3,
        }
        return results;

    },
};

module.exports = Employee;
