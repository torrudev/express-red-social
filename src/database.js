const { Pool } = require('pg');
const { promisify } = require('util');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGuser,
  host: process.env.PGhost,
  database: process.env.PGdatabase,
  password: process.env.PGpassword,
  port: process.env.PGport
});

pool.query = promisify(pool.query);

module.exports = pool;
