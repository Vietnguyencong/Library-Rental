const db = require('./db');
const helper = require('../helper');

async function get(){
    const rows = await db.query(
      `SELECT *
      FROM NOTIFICATIONS`
    );
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data).split('"id":').join('"user_id":'));
    return ndata;
  }


module.exports = {
    get,
}