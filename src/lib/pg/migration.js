/* eslint-disable no-console */
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
  await client.query(
    `CREATE TABLE IF NOT EXISTS users ( 
          id serial PRIMARY KEY, 
          username VARCHAR (64) UNIQUE NOT NULL, 
          password TEXT NOT NULL,
          name VARCHAR (64) NOT NULL, 
          role VARCHAR (10), 
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, 
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );`,
  );
  console.info('create table success');
};

const insertTable = async () => {
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
                            'admin',
                            'admin'
                          )`);
  console.info('insert table success');
};

const migration = async (clientParam) => {
  try {
    await clientParam.connect();
    await createTable(clientParam);
    await insertTable(clientParam);
    await clientParam.end();
  } catch (err) {
    console.error(err.message);
    clientParam.end();
  }
};

migration(client);
