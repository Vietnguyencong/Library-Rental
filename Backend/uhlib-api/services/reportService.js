const db = require('./db');
const helper = require('../helper');

async function get(date1, date2){
    const rows = await db.query(
      `SELECT * FROM USERS where created_at >= '${date1}' and created_at <= '${date2}'; `
    );
    console.log(`SELECT * FROM USERS where created_at >= '${date1} and created_at <= ${date2};`);
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data).split('"user_id":').join('"id":'));
    console.log('num users', ndata);
    return ndata;
}

async function getloans(){
    const rows = await db.query(
      `SELECT Count(distinct user_id) as data FROM TRANSACTION;`
    );
    console.log(JSON.stringify(rows))
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
    console.log(JSON.stringify(rows))
    const data = helper.cleanRows(rows)[0];

    return data;  
  
    // const data = JSON.parse(helper.cleanRows(rows));
    // print(JSON.stringify(data));
    // return data['Count(distinct user_id)'];
}

async function getpieitems(){
    const rows = await db.query(
      `SELECT item_type as item, Count(item_type) as data FROM ITEMS group by item_type;`
    );
    console.log(JSON.parse(JSON.stringify(rows)))
    
    var result = [];
    result.push(['A','B']);

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







////////reports #3

async function getTotalEmp(){
  const rows = await db.query(
    `SELECT Count(distinct employee_id) as data FROM EMPLOYEES;`
  );
  console.log(JSON.stringify(rows))
  const data = helper.cleanRows(rows)[0];

  return data;
}

async function getAnnualAvg(){
  const rows = await db.query(
    `SELECT TRUNCATE(AVG(salary),2) as data FROM EMPLOYEES;`
  );
  console.log(JSON.stringify(rows))
  const data = helper.cleanRows(rows)[0];

  return data;
}

async function getHourlyAvg(){
  const rows = await db.query(
    `SELECT TRUNCATE(AVG(hourly_rate),2 ) as data FROM EMPLOYEES;`
  );
  console.log(JSON.stringify(rows))
  const data = helper.cleanRows(rows)[0];

  return data;
}

async function getbaritems(){
  const rows = await db.query(
    `SELECT library_id, COUNT(*) as data FROM EMPLOYEES GROUP BY library_id;`
  );
  const Transrows = await db.query(
  `SELECT library_id, COUNT(*) as data FROM LibaryIDFromLoans GROUP BY library_id order by library_id asc ;`
  );

  console.log(JSON.parse(JSON.stringify(rows)))
  var result = [];
  result.push(['Library ID', 'Employees', 'Transactions']);
  for (var i = 0; i < rows.length; i++) {
      var obj = rows[i];
      var Transobj = Transrows[i];
      const res = [];
      const keys = Object.keys(obj);
      const Transkeys = Object.keys(Transobj);
      for (let j = 0; j < keys.length; j++) {
          const key = keys[j];
          res.push(obj[key]);
          if(j != 0)
          {
          const key = Transkeys[j];
          res.push(Transobj[key]);
          }
      }

      result.push(res);
  }
  console.log(result);

  return result;  
}

async function getEpieitems(){
  const rows = await db.query(
    `SELECT job_title, COUNT(*) as data FROM EMPLOYEES GROUP BY job_title;`
  );
  console.log(JSON.parse(JSON.stringify(rows)))
  
  var result = [];
  result.push(['A','B']);

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
    getpieitems,
    getTotalEmp,
    getAnnualAvg,
    getHourlyAvg,
    getbaritems,
    getEpieitems
}

function create_condition_string (length, value){ 
    var array = Array(length).fill(value)
    return array.join()
  }