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


  async function removeOne(req){
    let id = req.body.id;
    let item_id = req.body.item_id;
    const result = await db.query(`
    DELETE FROM WAITING_LIST where item_id= ${item_id} AND user_id=${id}`);
    let message = `Error in deleting user ${id}`;
      
    if (result.affectedRows) {
        message = `User ${id} deleted successfully`;
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
    getBookList,
    getUserList,
    removeOne,
    removeUser,
    removeItem,
}