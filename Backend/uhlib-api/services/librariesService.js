const db = require('./db');
const helper = require('../helper');

async function get(){
    const rows = await db.query(
      `SELECT library_id, name, opening_hours, location
      FROM LIBRARIES`
    );
  
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data).split('"library_id":').join('"id":'));
    return ndata;
}

async function getID(libraryID){
  const rows = await db.query(
    `SELECT library_id, name, opening_hours, location
    FROM LIBRARIES
    WHERE library_id=${libraryID}`
  );

  const data = helper.cleanRows(rows);
  
  return 
    data[0];
  
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

module.exports = {
  get,
  getID,
  getName,
  getLocation,
  create,
  update,
  remove
}