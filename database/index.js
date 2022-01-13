const { Pool } = require('pg');

const pool = new Pool({
  user: 'andrew',
  host: 'localhost',
  database: 'qa',
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
