const db = require('./db');
const helper = require('../helper');
const {create_condition_string} = require("../helper")

// GET http://my.api.url/posts?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}


// /users?sort= userid 

getByFIlter = async (sort, range, filter) => {
  console.log(sort[1], filter.title);
  let pair = Object.keys(filter);
  let key  = pair[0];
  console.log('data', key, JSON.stringify(pair));
  console.log(key, filter[key]);
  const rows = await db.query(
    `Select * from USERS where ${key}='${filter[key]}' AND street_number BETWEEN ${range[0]} AND ${range[1]} ORDER BY ${sort[0]} ${sort[1]}`
  );

  const data = helper.cleanRows(rows);
  console.log(data);
  
  return {
    data
  }
}

async function get(){
  const rows = await db.query(
    `SELECT user_id, city, first_name, last_name, middle_initial, phone_number, email_address, zip_code, state, city, street_name, street_number
    FROM USERS`
  );

  const data = helper.cleanRows(rows);
  var ndata = JSON.parse(JSON.stringify(data).split('"user_id":').join('"id":'));
  return ndata;
}

// /users/?state=TX 

async function getUserByState(state){
    const user =  await db.query(`Select * from USERS where state='${state}'`);

    const data = helper.cleanRows(user);
    return {data}
}

async function getUser(user_id){
  const user =  await db.query(`Select * from USERS where user_id=${user_id}`);

  const data = helper.cleanRows(user);
  let message = `Error in getting user ${user_id}`;

  // if (result.affectedRows) {
  //   message = `User received`;
  // }
  var ndata = JSON.parse(JSON.stringify(data).split('"user_id":').join('"id":'));
  return ndata[0];
}

async function createNoInjection(user){
  console.log(user);
  console.log(user.first_name);
  console.log(user.middle_initial);
  console.log(user.last_name);
  console.log(user.street_number);
  console.log(user.city);
  console.log(user.state);
  console.log(user.zip_code);
  console.log(user.discount_id);
  console.log(user.is_admin);
  console.log(user.social_security);
  const result = await db.query(
    `INSERT INTO USERS 
    (first_name, middle_initial, last_name, street_number, city, state, zip_code, discount_id, is_admin, 
      social_security, phone_number, email_address, street_name, user_password) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [
      user.first_name, user.middle_initial,
      user.last_name, user.street_number,
      user.city, user.state, user.zip_code,
      user.discount_id, user.is_admin, user.social_security, user.phone_number, user.email_address, user.street_name, user.user_password
    ]
  );

  let message = 'Error in creating a new user';

  if (result.affectedRows) {
    message = `A new user ${user.first_name} ${user.email_address} was created successfully`;
  }

  return {message};
}

async function create(req){

    console.log("create");
    let first_name = req.body.first_name;
    let middle_initial = req.body.middle_initial;
    let last_name = req.body.last_name;
    let email_address = req.body.email_address;
    let street_number = req.body.street_number;
    let city = req.body.Houston;
    let state = req.body.state;
    let zip_code = req.body.zip_code;
    let discount_id = req.body.discount_id;
    let user_password = req.body.user_password;
    let is_admin = req.body.is_admin;
    let social_security = req.body.social_security;
    let phone_number = req.body.phone_number;
    let created_by = req.body.created_by;
    let street_name = req.body.street_name;

    const user = await db.query(`
    INSERT INTO USERS(first_name, middle_initial, last_name, street_number, city, state, zip_code, discount_id, is_admin, social_security ) VALUES('test', 't', 'test',1,'test', 'yh',12345,1, 0, '123456789')`);
    return {"output" : "sucess"}

}

async function update(id, req){
  let name = req.first_name;
  let thisid = id;
  console.log("REQ BODY", req.first_name);
  console.log(id);
  console.log(req.id);
  const user = await db.query(`
  UPDATE USERS SET first_name=?, middle_initial=?, last_name=?, street_number=?, city=?, state=?, zip_code=?, discount_id=?, is_admin=?, social_security=?
   WHERE user_id=?`,
   [
    req.first_name, req.middle_initial,
    req.last_name, req.street_number,
    req.city, req.state, req.zip_code,
    req.discount_id, req.is_admin, req.social_security, id
   ]
   );
  
  let message = `Error in updating user ${id}`;


  if (user.affectedRows) {
    message = `User ${id}  updated successfully`;
  }
  return {message};
}

async function updateNoBody(req){
    let name = req.body.first_name;
    console.log(`update ${req.params.id} : ${name}`);

    const user = await db.query(`
    UPDATE USERS set first_name = '${name}' where user_id=${req.params.id}`);
    
    let message = `Error in updating user ${req.params.id} ${name}`;

    if (user.affectedRows) {
      message = `User ${req.params.id} ${name} updated successfully`;
    }
    return {message};
}

async function remove(req){
    let id = req.body.id;
    console.log(`remove ${id}`);

    const result = await db.query(`
    DELETE FROM USERS where user_id=${id}`);

    let message = `Error in deleting user ${id}`;

    if (result.affectedRows) {
      message = `User ${id} deleted successfully`;
    }

  return {message};
}  


getMany = async (req,res,next) =>{
  try{
    const ids = JSON.parse(req.query.filter).id
    if (ids == null) return res.status(400).send({"message": "cannot find the data"})
    var condition_tring = create_condition_string(ids.length, "?") // ?,?,?
    const query = `SELECT * FROM  USERS WHERE user_id  in ( ${condition_tring} ) ;`
    const rows = await db.query(query, ids)
    const data = helper.cleanRows(rows)
    
    return res.json(data)
  }catch(err){
    next(err)
  }
}

getUserByFirstName = async (req,res, next)=>{ 
  try{
    const context = JSON.parse(req.query.filter)
    if (JSON.stringify(context) !== "{}"){
      const key = Object.keys(context)[0]
      const value = context[key]
      var query = `SELECT * FROM USERS WHERE ${key} LIKE '%${value}%' ; `
      var rows = await db.query(query, []) 
      console.log(rows)
      if (rows.length == 0 ){
          var query = `SELECT * from USERS; `
          var rows = await db.query(query, [])
      }
      const data = helper.cleanRows(rows)
      return res.json(data)
      }
    else{
        var query = `SELECT * from USERS; `
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
          var query = `SELECT * from USERS where ${condition_tring} ;` 
          // console.log(query)
          const rows = await db.promisePool.query(query, [])
          const data = helper.cleanRows(rows)
          return res.json(data)
          
      }else{
          const query = `SELECT * from USERS; `
          const rows = await db.promisePool.query(query, []) 
          const data = helper.cleanRows(rows)
          return res.json(data)
      }
      
  }catch(err){
      next(err)
  }
 
}


module.exports = {
  get,
  getUser,
  getUserByState,
  getByFIlter,
  create,
  createNoInjection,
  update,
  updateNoBody,
  remove,
  getMany,
  getUserByFirstName, 
  getAll
}


