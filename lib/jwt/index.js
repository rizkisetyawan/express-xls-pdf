const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

const sign = (payload) => {
	const token = jwt.sign(payload, jwtSecret, {
		expiresIn: '24h',
	});
	return token;
};

const verify = (token) => {
	const removeBearer = token.slice(7, token.length);
	const decoded = jwt.verify(removeBearer, jwtSecret);
	return decoded;
};

module.exports = {
	sign,
	verify,
};
