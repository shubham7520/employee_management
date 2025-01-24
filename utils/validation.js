const Joi = require('joi');

const validateEmployeeData = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required(),
        salary: Joi.number().required(),
        department_name: Joi.string(),
        dob: Joi.date().required(),
    });

    const { error } = schema.validate(data);
    return !error;
};

module.exports = { validateEmployeeData };
