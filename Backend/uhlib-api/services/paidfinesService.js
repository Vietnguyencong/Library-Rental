const db = require('./db');
const helper = require('../helper');

/* GETS ALL FINES */ 
async function getAll(){
    const rows = await db.query(
      `SELECT *
      FROM PAID_FINES`
    );
    const data = helper.cleanRows(rows);
   // var ndata = JSON.parse(JSON.stringify(data).split('"users_id":').join('"user_id":'));
    return data;
  }

  async function getUser(users_id){
    const user =  await db.query(`Select * from PAID_FINES where users_id=${users_id}`);
    const data = helper.cleanRows(user);
    let message = `Error in getting user ${users_id}`;
    var ndata = JSON.parse(JSON.stringify(data).split('"users_id":').join('"item_id":'));
    return ndata;
  }

  async function getOneUser(id){
    const user =  await db.query(`Select * from PAID_FINES where id=${id}`);
    const data = helper.cleanRows(user);
    let message = `Error in getting ${id}`;
    //var ndata = JSON.parse(JSON.stringify(data).split('"id":').join('"id":'));
    return data[0];
  }


  //CREATE A NEW FINE
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
      message = `A new fine by user_id ${paid_fines.id} was created successfully`;
    }
    return {message};
  }

  //UPDATE EXISTING FINES BY ID
  async function update(id,req){
    const user = await db.query(`
    UPDATE PAID_FINES SET users_id= ?, item_id=?, description=?, final_amount=?, is_paid=?
     WHERE id=?`,
     [
      req.users_id, req.item_id, req.description, req.final_amount, req.is_paid,
      id, 
     ]
     );
    
    let message = `Error in updating fine ${id}`;
    if (user.affectedRows) {
      message = `Paid fines ${id}  updated successfully`;
    }
    return {message};
  }

//ONE FILTER, EMPLOYEE VIEW?
  getByuserF = async(filter) =>{
    let pair = Object.keys(filter);
    let key  = pair[0];
    const rows = await db.query(
      `Select * from PAID_FINES where ${key}=${filter[key]}`
    );
  
    const data = helper.cleanRows(rows);
    console.log(data);
    return {
      data
    }
  }

  /* REMOVE ONE PAID FINE BY ID*/
  async function remove(req){
    let id = req.body.id;
    const result = await db.query(`
    DELETE FROM PAID_FINES where id=${id}`);
    let message = `Error in deleting ${id} fines`;
    if (result.affectedRows) {
      message = `${id} deleted successfully`;
    }
  return {message};
  }  


module.exports = {
    getAll,
    getUser,
    getOneUser,
    create,
    update,
    remove,
    getByuserF
}