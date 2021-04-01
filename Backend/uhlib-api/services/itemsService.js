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

async function getByFilter(sort, range, filter){
  let pair = Object.keys(filter);
  let key  = pair[0];
  const rows = await db.query(
    `Select * from ITEMS where ${key}='${filter[key]}' AND stock BETWEEN ${range[0]} AND ${range[1]} ORDER BY ${sort[0]} ${sort[1]}`
  );

  const data = helper.cleanRows(rows);
  console.log(data);
  
  return {
    data
  }
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

module.exports = {
  get,
  getByFilter,
  create,
  update,
  remove
}
