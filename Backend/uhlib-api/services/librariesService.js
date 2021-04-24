const db = require('./db');
const helper = require('../helper');

async function get(){
    const rows = await db.query(
      `SELECT library_id, name, opening_hours, location, image_link
      FROM LIBRARIES`
    );
  
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data).split('"library_id":').join('"id":'));
    return ndata;
}

getByFilter = async(sort, range, filter) => {
  console.log(sort[1], filter.title)
  let pair = Object.keys(filter);
  let key = pair[0];
  console.log('data', key, JSON.stringify(pair));
  console.log(key, filter[key]);
  const rows = await db.query(
    `SELECT library_id, name, opening_hours, location
    FROM LIBRARIES WHERE ${key}='${filter[key]}' AND library_id BETWEEN ${range[0]} AND ${range[1]} ORDER BY ${sort[0]} ${sort[1]}`
  );

  const data = helper.cleanRows(rows);
  console.log(data)
  //var ndata = JSON.parse(JSON.stringify(data).split('"library_id":').join('"id":'));
  return {data}
}

async function getID(libraryID){
  const rows = await db.query(
    `SELECT library_id, name, opening_hours, location, created_at, updated_at
    FROM LIBRARIES
    WHERE library_id=${libraryID}`
  );
  
  const data = helper.cleanRows(rows);
  var ndata = JSON.parse(JSON.stringify(data).split('"library_id":').join('"id":'));
  return ndata[0];
  
}

async function getName(name){
  let nm = name;
  nm.replace('%20',' ');
  const rows = await db.query(
    `SELECT library_id, name, opening_hours, location
    FROM LIBRARIES
    WHERE name='${nm}'`
  );

  const data = helper.cleanRows(rows);
  
  return {
    data
  }
}

async function getLocation(location){
  let loc = location;
  loc.replace('%20',' ');
  const rows = await db.query(
    `SELECT library_id, name, opening_hours, location
    FROM LIBRARIES
    WHERE location='${loc}';`
  );

  const data = helper.cleanRows(rows);
  
  return {
    data
  }
}
//WHERE library_id=${library.id}
async function create(library){
  const result = await db.query(
    `INSERT INTO LIBRARIES 
    (name, opening_hours, location) 
    VALUES 
    (?, ?, ?)`, 
    [
      library.name, library.opening_hours, library.location
    ]
  );

  let message = 'Error in creating a new library';

  if (result.affectedRows) {
    message = `A new library ${library.name} was created successfully`;
  }

  return {message};
}

async function update(req){

  const user = await db.query(`
  UPDATE LIBRARIES SET name=?, opening_hours=?, location=?
   WHERE library_id=?`,
   [
     req.name, req.opening_hours, req.location, req.id
   ]
   );
  
  let message = `Error in updating library ${req.id}`;


  if (user.affectedRows) {
    message = `Library ${req.id} updated successfully`;
  }
  return {message};
}

async function remove(id){
  

  const result = await db.query(`
  DELETE FROM LIBRARIES WHERE library_id=${id}`);

  let message = `Error in deleting library ${id}`;

  if (result.affectedRows) {
    message = `Library ${id} deleted successfully`;
  }

return {message};
}    

getLibraryByName = async (req,res, next)=>{ 
  try{
    const context = JSON.parse(req.query.filter)
    if (JSON.stringify(context) !== "{}"){
      const key = Object.keys(context)[0]
      const value = context[key]
      var query = `SELECT * FROM LIBRARIES WHERE ${key} LIKE '%${value}%' ; `
      var rows = await db.query(query, []) 
      console.log(rows)
      if (rows.length == 0 ){
          var query = `SELECT * from LIBRARIES; `
          var rows = await db.query(query, [])
      }
      const data = helper.cleanRows(rows)
      return res.json(data)
      }
    else{
        var query = `SELECT * from LIBRARIES; `
        var rows = await db.query(query, [])
        const data = helper.cleanRows(rows)
        return res.json(data)
    }
  }catch(err){
    next(err)
  }
}

module.exports = {
  get,
  getByFilter,
  getID,
  getName,
  getLocation,
  create,
  update,
  remove,
  getLibraryByName
}