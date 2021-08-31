const Joi = require('joi');

const joi = async (schema, data) => {
  const schemaValidate = Joi.object(schema);
  await schemaValidate.validateAsync(data);
};

module.exports = joi;
