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

module.exports = {
    get
}