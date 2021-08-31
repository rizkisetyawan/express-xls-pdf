const {
  pg: { pool },
} = require('../../lib');

const checkUser = async (username) => {
  const text = 'SELECT * FROM users WHERE username = $1';
  const value = [username];
  const data = await pool.query(text, value);
  return data.rows[0];
};

const getUser = async (id) => {
  const text = 'SELECT * FROM users WHERE id=$1';
  const value = [id];
  const data = await pool.query(text, value);
  return data.rows[0];
};

module.exports = {
  checkUser,
  getUser,
};
