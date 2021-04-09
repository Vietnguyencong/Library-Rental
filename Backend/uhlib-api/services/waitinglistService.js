const db = require('./db');
const helper = require('../helper');

async function getwaitinglist(){
    const rows = await db.query(
      `SELECT *
      FROM WAITING_LIST`
    );
    const data = helper.cleanRows(rows);
    //var ndata = JSON.parse(JSON.stringify(data).split('"id":').join('"user_id":'));
    return data;
  }

  async function getOne(id){
    const rows = await db.query(
      `SELECT *
      FROM WAITING_LIST WHERE id = '${id}'`
    );
    const data = helper.cleanRows(rows);
    return data[0];
  }


  async function getBookList(id){
    const rows = await db.query(
      `SELECT *
      FROM WAITING_LIST WHERE item_id = '${id}'`
    );
    const data = helper.cleanRows(rows);
    return data;
  }

  async function getUserList(id){
    const rows = await db.query(
      `SELECT *
      FROM WAITING_LIST WHERE user_id = '${id}'`
    );
    const data = helper.cleanRows(rows);
    return data;
  }

  //CREATE NEW INSERT IN WAITING_LIST
  async function create(waiting_list){
    const result = await db.query(
      `INSERT INTO WAITING_LIST 
      (user_id, item_id) 
      VALUES 
      (?, ?)`, 
      [
        waiting_list.user_id, waiting_list.item_id
      ]
    );
    let message = 'Error in inserting a new item';
  
    if (result.affectedRows) {
      message = `A new item by user_id ${waiting_list.user_id} was created successfully`;
    }
    return {message};
  }

   //UPDATE EXISTING FINES BY ID
   async function update(id,req){
    const user = await db.query(`
    UPDATE WAITING_LIST SET user_id= ?, item_id=?
     WHERE id=?`,
     [
      req.user_id, req.item_id,
      id,
     ]
     );
    
    let message = `Error in updating fine ${id}`;
    if (user.affectedRows) {
      message = `Waiting list ${id}  updated successfully`;
    }
    return {message};
  }

  async function removeOne(req){
    let id = req.body.id;
    const result = await db.query(`
    DELETE FROM WAITING_LIST where id=${id}`);
    let message = `Error in deleting user ${id}`;
      
    if (result.affectedRows) {
        message = `Wait list ${id} deleted successfully`;
    }
      
    return {message};
    } 

  async function removeUser(req){
    let id = req.body.id;
    const result = await db.query(`
    DELETE FROM WAITING_LIST where user_id=${id}`);
  
    let message = `Error in deleting user ${id}`;
    if (result.affectedRows) {
      message = `User ${id} deleted successfully`;
    }
  return {message};
  }

  async function removeItem(req){
    let id = req.body.id;
    const result = await db.query(`
    DELETE FROM WAITING_LIST where item_id=${id}`);
  
    let message = `Error in deleting item ${id}`;
    if (result.affectedRows) {
      message = `Item ${id} deleted successfully`;
    }
  return {message};
  }

module.exports = {
    getwaitinglist,
    getOne,
    getBookList,
    getUserList,
    create,
    update,
    removeOne,
    removeUser,
    removeItem,
}