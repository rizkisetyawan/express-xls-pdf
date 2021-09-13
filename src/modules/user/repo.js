const { pool } = require('../../lib/pg');

const createUser = async (username, hashPassword, name, role) => {
  const text = 'INSERT INTO users (username, password, name, role) VALUES($1, $2, $3, $4) RETURNING *';
  const value = [username, hashPassword, name, role];
  const data = await pool.query(text, value);
  return data.rows[0];
};

module.exports = {
  createUser,
};
