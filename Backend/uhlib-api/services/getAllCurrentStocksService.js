const db = require('./db');
const helper = require('../helper');

async function get(){
  const rows = await db.query(
    `CALL ITEM_LIST_INFO;`
  );
  const data = helper.cleanRows(rows);
  var ndata = JSON.parse(JSON.stringify(data));
  //var ndata = JSON.parse(JSON.stringify(data).split('"item_id":').join('"id":'));
  return ndata[0];
}

async function getByTitle(item_id){
    const user =  await db.query(`Select * from ITEMS where item_id=${item_id}`);
  
    const data = helper.cleanRows(user);
    let message = `Error in getting item ${item_id}`;
  
    // if (result.affectedRows) {
    //   message = `User received`;
    // }
    var ndata = JSON.parse(JSON.stringify(data).split('"item_id":').join('"id":'));
    return ndata[0];
}

module.exports = {
    get
}