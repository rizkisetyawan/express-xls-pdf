const {
	pg: { pool },
} = require('../../lib');

const createUser = async (username, hashPassword, name, role) => {
	const text =
		'INSERT INTO users (username, password, name, role) VALUES($1, $2, $3, $4) RETURNING *';
	const value = [username, hashPassword, name, role];
	try {
		const data = await pool.query(text, value);
		return data.rows[0];
	} catch (err) {
		throw err;
	}
};

module.exports = {
	createUser,
};
