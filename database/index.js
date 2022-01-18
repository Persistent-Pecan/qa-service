const { Pool } = require('pg');

const pool = new Pool({
  user: 'qa',
  password: process.env.POSTGRES,
  host: 'localhost',
  database: 'qa',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports.pool = pool;
