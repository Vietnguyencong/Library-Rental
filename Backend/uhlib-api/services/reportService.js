const db = require('./db');
const helper = require('../helper');

async function get(date1, date2){
    const rows = await db.query(
      `SELECT * FROM USERS where created_at >= '${date1}' and created_at <= '${date2}'; `
    );
    console.log(`SELECT * FROM USERS where created_at >= '${date1} and created_at <= ${date2};`);
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data).split('"user_id":').join('"id":'));
    // console.log('num users', ndata);
    return ndata;
}

async function getloans(date1, date2){
    const rows = await db.query(
      `SELECT Count(distinct user_id) as data FROM TRANSACTION where date_created >= '${date1}' and date_created <= '${date2}';`
    );
    console.log('loans ',JSON.stringify(rows))
    const data = helper.cleanRows(rows)[0];

    return data;  
  
    // const data = JSON.parse(helper.cleanRows(rows));
    // print(JSON.stringify(data));
    // return data['Count(distinct user_id)'];
}

async function getfinespaid(){
    const rows = await db.query(
      `SELECT SUM(final_amount) AS "Total Fines" from PAID_FINES where is_paid = 0;`
    );
    // console.log(JSON.stringify(rows))
    const data = helper.cleanRows(rows)[0];

    return data;  
  
    // const data = JSON.parse(helper.cleanRows(rows));
    // print(JSON.stringify(data));
    // return data['Count(distinct user_id)'];
}

async function getpieitems(date1, date2){
    const rows = await db.query(
      // `SELECT item_type as item, Count(item_type) as data FROM ITEMS group by item_type;`
      `SELECT item_type as item, Count(item_type) as data FROM ITEMS where created_at >= '${date1}' and created_at <= '${date2}' group by item_type ;`
    );
    // console.log(JSON.parse(JSON.stringify(rows)))
    
    var result = [];
    result.push(['Item','Number']);

    for (var i = 0; i < rows.length; i++) {
        var obj = rows[i];
        const res = [];
        const keys = Object.keys(obj);
        for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            res.push(obj[key]);
        }

        result.push(res);
    }
    console.log(result);

    return result;  
}

module.exports = {
    get,
    getloans,
    getpieitems
}

function create_condition_string (length, value){ 
    var array = Array(length).fill(value)
    return array.join()
  }