require('dotenv').config();

const config = {
	appPort: process.env.PORT,
	postgre: {
		host: process.env.PG_HOST,
		port: process.env.PG_PORT,
		user: process.env.PG_USER,
		password: process.env.PG_PASS,
		database: process.env.PG_DB,
	},
};

module.exports = config;
