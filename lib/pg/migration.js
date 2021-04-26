require('dotenv').config();
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
	host: process.env.PG_HOST,
	port: process.env.PG_PORT,
	user: process.env.PG_USER,
	password: process.env.PG_PASS,
	database: process.env.PG_DB,
});

const createTable = async () => {
	try {
		await client.query(
			`CREATE TABLE IF NOT EXISTS users ( 
          id serial PRIMARY KEY, 
          username VARCHAR (64) UNIQUE NOT NULL, 
          password TEXT NOT NULL,
					name VARCHAR (64) NOT NULL, 
          role VARCHAR (10), 
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, 
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );`
		);
		console.info('create table success');
	} catch (err) {
		throw err;
	}
};

const insertTable = async () => {
	try {
		const salt = await bcrypt.genSalt(10);
		const username = process.env.USER_INIT;
		const hashPassword = await bcrypt.hash(process.env.PASS_INIT, salt);
		await client.query(`INSERT INTO users (
                          username, 
                          password,
													name,
                          role
                        )
                          VALUES (
                            '${username}', 
                            '${hashPassword}',
														'admin,
                            'admin'
                          )`);
		console.info('insert table success');
	} catch (err) {
		throw err;
	}
};

const migration = async (client) => {
	try {
		await client.connect();
		await createTable(client);
		await insertTable(client);
		await client.end();
	} catch (err) {
		console.error(err.message);
		client.end();
	}
};

migration(client);
