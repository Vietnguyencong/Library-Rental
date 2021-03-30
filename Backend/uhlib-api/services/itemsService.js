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

async function create(){}

async function update(){}

async function remove(){}  

module.exports = {
  get,
  create,
  update,
  remove
}
