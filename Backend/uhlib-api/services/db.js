const mysql = require('mysql2/promise');
const config = require('../config');
const mysql2 = require("mysql2")

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  return results;
}

function edit_update_remove_helper(query, data){
  const con = mysql2.createConnection(config.db)
  con.execute(query, data, (err, results, fields)=>{
    if (err){
      return {"message": "sql syntax"}
    }
    return {"rowsaffected updated: ": results.affectedRows}
  })
  con.end()
}


module.exports = {
  query,
  edit_update_remove_helper
}
