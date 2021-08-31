const Joi = require('joi');

const loginSchema = {
  username: Joi.string().min(6).empty().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
      ),
    )
    .message(
      'password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters',
    ),
};

module.exports = {
  loginSchema,
};
