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

async function getByTitle(title){
    const rows =  await db.query(`CALL ITEM_LIST_INFO;`);
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data))[0];

    for(var i = 0, numRows=ndata.length;i<numRows;i++)
    {
        if(ndata[i].title==title)
        {
            return ndata[i];
        }
    }
    return;
}

module.exports = {
    get,
    getByTitle
}