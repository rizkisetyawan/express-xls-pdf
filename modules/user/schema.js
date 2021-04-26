const Joi = require('joi');

const userSchema = {
	username: Joi.string().min(6).empty().required(),
	role: Joi.string().valid('user', 'admin'),
	password: Joi.string()
		.pattern(
			new RegExp(
				'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
			)
		)
		.message(
			'password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters'
		),
};

module.exports = {
	userSchema,
};
