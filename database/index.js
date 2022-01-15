const { Client } = require('pg');

const client = new Client({
  user: 'andrew',
  host: 'localhost',
  database: 'qa',
});

client.connect(err => {
  if (err) {
    console.error('database connection error', err.stack)
  } else {
    console.log('database connected')
  }
})

module.exports.client = client;