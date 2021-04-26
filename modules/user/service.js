const { bcrypt, logs } = require('../../lib');
const { createUser } = require('./repo');

const createNewUser = async (username, password, name, role) => {
	try {
		const hashPassword = await bcrypt.hash(password);
		const result = await createUser(username, hashPassword, name, role);
		return {
			code: 200,
			result: {
				status: 'success',
				data: { user: result },
				message: 'user Created',
			},
		};
	} catch (err) {
		logs.error(err.message);
		return {
			code: 500,
			result: {
				status: 'error',
				message: err.message,
			},
		};
	}
};

module.exports = {
	createNewUser,
};
