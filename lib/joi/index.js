const Joi = require('joi');

const joi = async (schema, data) => {
	const schemaValidate = Joi.object(schema);
	try {
		await schemaValidate.validateAsync(data);
	} catch (error) {
		throw error;
	}
};

module.exports = joi;
