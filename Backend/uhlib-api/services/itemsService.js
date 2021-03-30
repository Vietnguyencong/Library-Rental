const db = require('./db');
const helper = require('../helper');

async function get(){
  const rows = await db.query(
    `SELECT item_id, current_quantity, title
    FROM ITEMS`
  );

  const data = helper.cleanRows(rows);
  
  return {
    data
  }
}

async function create(user){
  const result = await db.query(
   `INSERT INTO USERS (first_name, middle_initial, last_name, email_address) VALUES (?,?,?,?)`,
   [
    user.firstname, user.middle_initial, user.last_name, user.email_address
   ] 
  );

}

async function update(user_id, user){
  const result = await db.query(`UPDATE USERS SET first_name=?, middle_initial=?, last_name=?, email_address=? WHERE userid=?`,
   [
    user.firstname, user.middle_initial, user.last_name, user.email_address, user_id
   ] 
  );
}

async function remove(){}  

module.exports = {
  get,
  create,
  update,
  remove
}
