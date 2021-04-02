const db = require('./db');
const helper = require('../helper');

async function getSingleUser(user_id){
    const rows = await db.query(
      `SELECT *
      FROM NOTIFICATIONS WHERE user_id = '${user_id}'`
    );
    const data = helper.cleanRows(rows);
    return data;
  }

  async function getUsers(){
    const rows = await db.query(
      `SELECT *
      FROM NOTIFICATIONS`
    );
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data).split('"id":').join('"user_id":'));
    return ndata;
  }

  async function getEmployees(){
    const rows = await db.query(
      `SELECT *
      FROM EMPLOYEE_NOTIFICATIONS`
    );
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data).split('"id":').join('"employee_id":'));
    return ndata;
  }

  async function getSingleEmployee(employee_id){
    const rows = await db.query(
      `SELECT *
      FROM EMPLOYEE_NOTIFICATIONS WHERE employee_id = '${employee_id}'`
    );
    const data = helper.cleanRows(rows);
    return data;
  }

  async function removeUserNotification(id){
    const result = await db.query(`
    DELETE FROM NOTIFICATIONS where user_id=${id}`);

    let message = `Error in deleting user ${id}`;

    if (result.affectedRows) {
      message = `User ${id} deleted successfully`;
    }

  return {message};
}  

module.exports = {
    getUsers,
    getSingleUser,
    getEmployees,
    getSingleEmployee,
    removeUserNotification
}