const pg = require('pg');
const logs = require('../logs');
const { postgre } = require('../../config');

const pool = new pg.Pool(postgre);

const checkPool = () => {
  pool
    .query('SELECT NOW()')
    .then(() => {
      logs.info('db postgres connected');
    })
    .catch((err) => {
      logs.error(err.message);
    });
};

const endPool = () => {
  pool.end(() => {
    logs.info('db postgres has ended');
  });
};

module.exports = {
  pool,
  checkPool,
  endPool,
};
