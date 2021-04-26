const {
	pg: { pool },
} = require('../../lib');

const checkUser = async (username) => {
	const text = 'SELECT * FROM users WHERE username = $1';
	const value = [username];
	try {
		const data = await pool.query(text, value);
		return data.rows[0];
	} catch (err) {
		throw err;
	}
};

const getUser = async (id) => {
	const text = 'SELECT * FROM users WHERE id=$1';
	const value = [id];
	try {
		const data = await pool.query(text, value);
		return data.rows[0];
	} catch (err) {
		throw err;
	}
};

module.exports = {
	checkUser,
	getUser,
};
