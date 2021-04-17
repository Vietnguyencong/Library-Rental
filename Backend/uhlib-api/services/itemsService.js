const db = require('./db');
const helper = require('../helper');

async function get(){
  const rows = await db.query(
    `SELECT *
    FROM ITEMS`
  );
  const data = helper.cleanRows(rows);
  var ndata = JSON.parse(JSON.stringify(data).split('"item_id":').join('"id":'));
  return ndata;
}

async function getItem(item_id){
  const user =  await db.query(`Select * from ITEMS where item_id=${item_id}`);

  const data = helper.cleanRows(user);
  let message = `Error in getting item ${item_id}`;

  // if (result.affectedRows) {
  //   message = `User received`;
  // }
  var ndata = JSON.parse(JSON.stringify(data).split('"item_id":').join('"id":'));
  return ndata[0];
}

async function getByFilter(sort, range, filter){
  let pair = Object.keys(filter);
  let key  = pair[0];
  const rows = await db.query(
    `Select * from ITEMS where ${key}='${filter[key]}' AND stock BETWEEN ${range[0]} AND ${range[1]} ORDER BY ${sort[0]} ${sort[1]}`
  );

  const data = helper.cleanRows(rows);
  console.log(data);
  
  var ndata = JSON.parse(JSON.stringify(data).split('"item_id":').join('"id":'));
  return ndata;
};


async function create(item){
  const result = await db.query(
    `INSERT INTO ITEMS 
    (title, stock, current_quantity, price, rent_period, item_type, library_id, is_available) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?)`, 
    [
      item.title, item.stock, item.current_quantity, item.price,
      item.rent_period, item.item_type, item.library_id, item.is_available
    ]
  );

  let message = 'Error in inserting a new item';

  if (result.affectedRows) {
    message = `A new item ${item.title} ${item.item_type} was created successfully`;
  }

  return {message};
}

async function update(id, req){
  const user = await db.query(`
  UPDATE ITEMS SET title=?, stock=?, current_quantity=?, price=?, rent_period=?, item_type=?, library_id=?, is_available=?
   WHERE item_id=?`,
   [
    req.title, req.stock, req.current_quantity,
    req.price, req.rent_period, req.item_type,
    req.library_id, req.is_available,
    id
   ]
   );
  
  let message = `Error in updating item ${id}`;


  if (user.affectedRows) {
    message = `Item ${id}  updated successfully`;
  }
  return {message};
}

async function remove(req){
  let id = req.body.id;
  console.log(`remove ${id}`);

  const result = await db.query(`
  DELETE FROM ITEMS where item_id=${id}`);

  let message = `Error in deleting item ${id}`;

  if (result.affectedRows) {
    message = `Item ${id} deleted successfully`;
  }

return {message};
}  

getMany = async (req,res,next) =>{
  try{
    const ids = JSON.parse(req.query.filter).id
    const condition_tring = helper.create_condition_string(ids.length, "?")
    const query = `SELECT * from ITEMS where item_id in (${condition_tring});`
    const rows = await db.query(query, ids)
    const data = helper.cleanRows(rows)
    return res.json(data)
  }catch(err){
    next(err)
  }
}

getItemByTitle = async (req,res, next)=>{ 
  try{
    const context = JSON.parse(req.query.filter)
    // console.log(context)
    if (JSON.stringify(context) !== "{}"){
      const key = Object.keys(context)[0]
      const value = context[key]
      var query = `SELECT * FROM ITEMS WHERE ${key} LIKE '%${value}%' ; `
      var rows = await db.query(query, []) 
      console.log(rows)
      if (rows.length == 0 ){
          var query = `SELECT * from ITEMS; `
          var rows = await db.query(query, [])
      }
      const data = helper.cleanRows(rows)
      return res.json(data)
      }
    else{
        var query = `SELECT * from ITEMS; `
        var rows = await db.query(query, [])
        const data = helper.cleanRows(rows)
        return res.json(data)
    }
  }catch(err){
    next(err)
  }
}

getAll = async(req,res,next)=>{
  try{
      var context = JSON.parse(req.query.filter)
      if ( JSON.stringify(context) !== "{}" ){
          const keys = Object.keys(context)
          var conditions = []
          var params = []
          // console.log(keys)
          for (var i=0; i<keys.length; i++){
              conditions.push(`${[keys[i]]} like "%${context[keys[i]]}%"`) 
              params.push(context[keys[i]])
          }
          var condition_tring = conditions.join(" and ")
          // console.log(condition_tring)
          var query = `SELECT * from ITEMS where ${condition_tring} ;` 
          // console.log(query)
          const rows = await db.promisePool.query(query, [])
          const data = helper.cleanRows(rows[0])
          return res.json(data)
          
      }else{
          const query = `SELECT * from ITEMS; `
          const rows = await db.promisePool.query(query, []) 
          const data = helper.cleanRows(rows[0])
          return res.json(data)
      }
      
  }catch(err){
      next(err)
  }
 
}

module.exports = {
  get,
  getByFilter,
  getItem,
  create,
  update,
  remove,
  getMany,
  getItemByTitle,
  getAll
}
