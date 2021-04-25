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

async function getAll(){
  const rows = await db.query(
    `SELECT MAX(item_type) as item_type, MAX(item_id) as item_id, title, MAX(price) as price,MAX(shortDescr) as shortDescr, MAX(imageLink) as imageLink, sum(stock) as stock, sum(is_available) as current_available FROM ITEMS group by title having count(stock) >=1 ;`
  );
  // console.log('result1');
  const data = helper.cleanRows(rows);
  // console.log('result', data);
  var ndata = JSON.parse(JSON.stringify(data));
  //var ndata = JSON.parse(JSON.stringify(data).split('"item_id":').join('"id":'));
  return ndata;
}

async function getByTitle(title){
    const rows =  await db.query(`CALL ITEM_LIST_INFO;`);
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data).split('"title":').join('"id":'))[0];
    
    for(var i = 0, numRows=ndata.length;i<numRows;i++)
    {
        if(ndata[i].id==title)
        {
            return ndata[i];
        }
    }
    return;
}

module.exports = {
    get,
    getAll,
    getByTitle
}