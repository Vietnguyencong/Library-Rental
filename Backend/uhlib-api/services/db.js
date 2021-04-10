const mysql = require('mysql2/promise');
const config = require('../config');
const mysql2 = require("mysql2")

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  return results;
}


const pool = mysql2.createPool(config.db);
const promisePool = pool.promise();
module.exports = {
  query,
  promisePool, 
  
}
