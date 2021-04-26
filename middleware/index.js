const { joi, jwt } = require('../lib');

function hasRole(...role) {
	return function (req, res, next) {
		let token = req.header('Authorization');
		if (!token) {
			return res.status(401).json({
				status: 'error',
				message: 'no token, authorization denied',
			});
		}

		try {
			const decoded = jwt.verify(token);
			if (!role.includes(decoded.user.role)) {
				return res.status(403).json({
					status: 'error',
					message: 'your role is not permitted access',
				});
			}
			req.user = decoded.user;
			next();
		} catch (err) {
			res.status(401).json({
				status: 'error',
				message: err.message,
			});
		}
	};
}

function validate(type, schema) {
	return async function (req, res, next) {
		try {
			await joi(schema, type === 'body' ? req.body : req.query);
			next();
		} catch (err) {
			res.status(400).json({
				status: 'error',
				message: err.message,
			});
		}
	};
}

module.exports = {
	validate,
	hasRole,
};
