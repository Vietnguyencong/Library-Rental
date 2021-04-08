
var db = require("./db")
const helper = require('../helper');

// GET ALL / 
async function getEmployees(){
    const rows = await db.query(
        `SELECT * FROM EMPLOYEES;`
    );
    const data = helper.cleanRows(rows);
    return data ;
}
   
// http://localhost:3000/transactions/:id 
//Get one employee by ID
async function getOne(employeeID){
    const rows = await db.query(
        `SELECT * FROM EMPLOYEES WHERE employee_id = ${employeeID}`
    );
    const data = helper.cleanRows(rows);
    var ndata = JSON.parse(JSON.stringify(data).split('"employee_id":').join('"id":'));
    return ndata[0]; 
}


// PUT /posts/123 
//Update employee
async function update(id, req){
    const employee = await db.query(
        `UPDATE EMPLOYEES SET first_name = ?, middle_initial=?, last_name=?, email_address = ?, salary = ?, street_number=?, street_name=?, city=?, state=?, zipcode=?, hourly_rate=?, password = ?, job_title = ? WHERE employee_id = ?`,
    [req.first_name, req.middle_initial, req.last_name, req.email_address, req.salary, req.street_number,
    req.street_name, req.city, req.state, req.zipcode, req.hourly_rate, 
     req.password, req.job_title, id]
    );

    let message = `Error updating user ${id}`;
    if(employee.affectedRows)
    {
        message = `User ${id} updated`;
    }

    return {message};
}

//create new employee
async function create(employee){
    const new_employee = await db.query(
        `INSERT INTO EMPLOYEES
        (library_id, first_name, middle_initial, last_name, email_address, salary, street_number, street_name, city, state, zipcode, hourly_rate, job_title, password)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
            employee.library_id, employee.first_name, employee.middle_initial, employee.last_name, employee.email_address, employee.salary,
            employee.street_number, employee.street_name, employee.city, employee.state, employee.zipcode, employee.hourly_rate,
            employee.job_title, employee.password
        ]
    );
    let message = `Error creating employee`;

    if (new_employee.affectedRows) {
        message = `New employee ${employee.first_name} created successfully`;
    }

    return {message};
}
//DELETE http://my.api.url/posts/:id 

//purge employee
async function remove(req){
    let id = req.params.id;

    const delete_employee = await db.query(
        `DELETE FROM EMPLOYEES WHERE employee_id=${id}`);
    let message = `Error deleting employee ${id}`;
    if(delete_employee.affectedRows){
        message = `Item ${id} deleted`;
    }
    return {message};
}

module.exports = { 
    getEmployees,
    getOne,
    update, 
    remove, 
    create, 
}



// var db = require("./db")
// var {cleanRows}  = require('../helper')
// const {v4:uuidv4} = require("uuid")

// // GET / 
// getEmployees = async(req,res) =>{
//     console.log(req.query)
//     const query = `SELECT * FROM EMPLOYEES; ` 
//     console.log('id is', req.params.id);
//     const rows = await db.query(query) 
//     const data = cleanRows(rows) 
//     // if ((data).length==0) return res.status(400).send({"message": "not found the instance"});
//     var ndata = JSON.parse(JSON.stringify(data).split('"employee_id":').join('"id":'));;
//     res.json(ndata)
// }

// // http://localhost:3000/api/transactions/:id 
// getOne  = async (req,res) =>{
//     console.log("getone");
//     const id = String(req.params.id)  
//     if (id == null ){
//         return res.status(400).send({"message": "no result"}) 
//     }
//     const query = `SELECT *  FROM EMPLOYEES where employee_id=? ; `
//     const row = await db.query(query, [id])
//     const data = cleanRows(row) 
//     // if ((data).length==0) return res.status(400).send({"message": "not found the instance"})
//     return res.json(data)
// }

// // GET /posts/many?filter={"id":[123,456,789]}
// getMany = async (req,res) =>{
//     const ids = JSON.parse(req.query.filter).id
//     if (ids == null) return res.status(400).send({"message": "cannot find the data"})
//     var condition_tring = create_condition_string(ids.length, "?") // ?,?,?
//     console.log("id is ", condition_tring);
//     const query = `SELECT * FROM  EMPLOYEES WHERE employee_id  in ( ${condition_tring} ) ;`
//     const rows = await db.query(query, ids)
//     const data = cleanRows(rows)
//     return res.json(data)
// }

// // PUT /posts/123 
// update = async (req,res) =>{
//     const id = String(req.params.id)
//     if (id == null) return res.status(400).send({"message": "cannot find the data"})
//     const updated_data = JSON.parse(req.query.update)
    
//     const query = `UPDATE EMPLOYEES
//     SET user_id = ?
//     WHERE employee_id = ?; `
//     const data =[ updated_data.user_id , id ] 

//     const message = await db.query(query, data)
//     return res.json(message)
// }


// // PUT http://my.api.url/posts?filter={"id":[123,124,125]}
// updateMany = async (req,res)=>{
//     const ids = JSON.parse(req.query.filter).id
//     if (ids == null) return res.status(400).send({"message": "cannot find the data"})
    
//     const query = `UPDATE EMPLOYEES SET user_id WHERE employee_id  in (${create_condition_string(ids.length,"?")}} ) ;`
//     const  message = await db.query(query, ids)
    
//     return res.json(message)
// }

// // POST  /transactions // need user_id and create user transaction_id // date_created auto fill 
// create = async(req,res) =>{
//     console.log("create");
//     const user_id = req.body.user_id
//     const newId = uuidv4() 
//     const query = `INSERT INTO EMPLOYEES (first_name,middle_initial,last_name,email_address,salary,street_number,street_name,city,state,zipcode,hourly_rate,job_title,password) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,? ) ;` 
//     const data = [newId, user_id] 
//     console.log(JSON.stringify(Object.values(req.body)));
//     const message = await db.query(query, Object.values(req.body))
//     return res.json(message)
// }
// //GET  transactiosn/references?filter = {"user_id " : 1 } 
// get_transactions_for_user = async(req,res) =>{
//     const context = JSON.parse(req.query.filter)

//     const key = Object.keys(context)[0]
//     const value = context[key]

//     const query = `SELECT *  FROM   TRANSACTION  where ${key}  = ? ;  `
//     const rows = await db.query(query, [value]) 
//     const data = cleanRows(rows)
//     // if ((data).length==0) return res.status(400).send({"message": "not found the instance"})
//     return res.json(data)
// }

// //DELETE http://my.api.url/posts/:id 
// remove = async (req,res) =>{ 

//     const id = req.params.id
//     console.log('remove id', id);
//     if (id == null) return res.status(400).send({"message": "cannot find the data to update"})
//     const query = `DELETE  FROM EMPLOYEES WHERE employee_id = ? ; `
//     const message = await db.query(query, [id])
//     return res.json(message)
// }
// // DELETE http://my.api.url/posts/many?filter={"id":[123,124,125]}
// removeMany = async(req,res)=>{
//     // const ids = JSON.parse(req.query.filter).id 
//     // console.log('ids are ',ids);
//     // if (ids == null) return res.status(400).send({"message": "cannot find the data to delete"})
//     // const query = `DELETE FROM EMPLOYEES  WHERE employee_id  IN (${create_condition_string(ids.length, "?")}) ;`
//     // const  message = await db.query(query, ids)
    
//     return res.json("message")
// }

// module.exports = { 
//     getEmployees,
//     getOne,
//     getMany,
//     update, 
//     remove, 
//     create, 
//     removeMany
// }

// function create_condition_string (length, value){ 
//     var array = Array(length).fill(value)
//     return array.join()
// }