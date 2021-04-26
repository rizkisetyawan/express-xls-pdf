require('dotenv').config();
const pg = require('pg');
const config = {
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	user: process.env.PG_USER,
	password: process.env.PG_PASS,
	database: process.env.PG_DB,
};

const pool = new pg.Pool(config);

const checkPool = () => {
	pool
		.query('SELECT NOW()')
		.then((res) => {
			console.info(`db postgres connected`);
		})
		.catch((err) => {
			console.error(err.message);
		});
};

const endPool = () => {
	pool.end(() => {
		console.info('db postgres has ended');
	});
};

module.exports = {
	pool,
	checkPool,
	endPool,
};
