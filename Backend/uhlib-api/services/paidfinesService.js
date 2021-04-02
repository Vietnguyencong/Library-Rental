const db = require('./db');
const helper = require('../helper');

async function get(){
    const rows = await db.query(
      `SELECT *
      FROM PAID_FINES`
    );
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data).split('"users_id":').join('"item_id":'));
    return ndata;
  }

  async function create(paid_fines){
    const result = await db.query(
      `INSERT INTO PAID_FINES 
      (users_id, item_id, description, final_amount, is_paid) 
      VALUES 
      (?, ?, ?, ?, ?)`, 
      [
        paid_fines.users_id, paid_fines.item_id, paid_fines.description, paid_fines.final_amount,
        paid_fines.is_paid
      ]
    );
    let message = 'Error in inserting a new item';
  
    if (result.affectedRows) {
      message = `A new fine by user_id ${paid_fines.users_id} was created successfully`;
    }
    return {message};
  }

  async function update(id, req){
    const user = await db.query(`
    UPDATE PAID_FINES SET item_id=?, description=?, final_amount=?, is_paid=?
     WHERE users_id=?`,
     [
      req.item_id, req.description, req.final_amount, req.is_paid,
      id
     ]
     );
    
    let message = `Error in updating item ${id}`;
    if (user.affectedRows) {
      message = `Paid fines ${id}  updated successfully`;
    }
    return {message};
  }


module.exports = {
    get,
    create,
    update
}