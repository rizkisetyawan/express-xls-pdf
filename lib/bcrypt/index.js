const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const hash = (data) => {
	const hashData = bcrypt.hashSync(data, salt);
	return hashData;
};

const compare = (data, hashData) => {
	const isValid = bcrypt.compareSync(data, hashData);
	return isValid;
};

module.exports = {
	hash,
	compare,
};
