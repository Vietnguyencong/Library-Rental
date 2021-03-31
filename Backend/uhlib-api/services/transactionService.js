var db = require("./db")
var {cleanRows}  = require('../helper')
const {v4:uuidv4} = require("uuid")

// GET / 
getList = async(req,res) =>{
    // console.log(req.query)
    const query = `SELECT * FROM TRANSACTION; ` 
    const rows = await db.query(query) 
    const data = cleanRows(rows) 
    // if ((data).length==0) return res.status(400).send({"message": "not found the instance"})
    res.json(data)
}


// http://localhost:3000/transactions/:id 
getOne  = async (req,res) =>{
    const id = String(req.params.id)  
    if (id == null ){
        return res.status(400).send({"message": "no result"}) 
    }
    const query = `SELECT *  FROM TRANSACTION WHERE transaction_id = ? ; `
    const row = await db.query(query, [id])
    const data = cleanRows(row) 
    // if ((data).length==0) return res.status(400).send({"message": "not found the instance"})
    return res.json(data)
}
// GET /posts/many?filter={"id":[123,456,789]}
getMany  = async (req,res)=>{
    const ids = JSON.parse(req.query.filter).id
    if (ids == null) return res.status(400).send({"message": "cannot find the data"})
    var condition_tring = create_condition_string(ids.length, "?")
    const query = `SELECT * FROM  TRANSACTION WHERE transaction_id  in ( ${condition_tring} ) ;`
    const  rows = await db.query(query, ids)
    const data = cleanRows(rows)
    
    return res.json(data)
}
// PUT /posts/123 
update = async (req,res) =>{
    const id = String(req.params.id)
    if (id == null) return res.status(400).send({"message": "cannot find the data"})
    const updated_data = JSON.parse(req.query.update)
    
    const query = `UPDATE TRANSACTION
    SET user_id = ?
    WHERE transaction_id = ?; `
    const data =[ updated_data.user_id , id ] 

    const message = await db.query(query, data)
    return res.json(message)
}
// PUT http://my.api.url/posts?filter={"id":[123,124,125]}
updateMany = async (req,res)=>{
    const ids = JSON.parse(req.query.filter).id
    if (ids == null) return res.status(400).send({"message": "cannot find the data"})
    
    const query = `UPDATE TRANSACTION SET user_id WHERE transaction_id  in (${create_condition_string(ids.length,"?")}} ) ;`
    const  message = await db.query(query, ids)
    
    return res.json(message)
}

// POST  /transactions // need user_id and create user transaction_id // date_created auto fill 
create = async(req,res) =>{
    const user_id = req.body.user_id
    const newId = uuidv4() 
    const query = `INSERT INTO TRANSACTION (transaction_id, user_id ) VALUES ( ?, ? ) ;` 
    const data = [newId, user_id] 
    const message = await db.query(query, data)
    return res.json(message)
}
//GET  transactiosn/references?filter = {"user_id " : 1 } 
get_transactions_for_user = async(req,res) =>{
    const context = JSON.parse(req.query.filter)

    const key = Object.keys(context)[0]
    const value = context[key]

    const query = `SELECT *  FROM   TRANSACTION  where ${key}  = ? ;  `
    const rows = await db.query(query, [value]) 
    const data = cleanRows(rows)
    // if ((data).length==0) return res.status(400).send({"message": "not found the instance"})
    return res.json(data)
}

//DELETE http://my.api.url/posts/:id 
remove = async (req,res) =>{ 
    const id = req.params.id 
    if (id == null) return res.status(400).send({"message": "cannot find the data to update"})
    const query = `DELETE  FROM TRANSACTION WHERE transaction_id = ? ; `
    const message = await db.query(query, [id])
    return res.json(message)
}
// DELETE http://my.api.url/posts/many?filter={"id":[123,124,125]}
removeMany = async(req,res)=>{
    const ids = JSON.parse(req.query.filter).id 
    if (ids == null) return res.status(400).send({"message": "cannot find the data to delete"})
    const query = `DELETE FROM TRANSACTION  WHERE transaction_id  IN (${create_condition_string(ids.length, "?")}) ;`
    const  message = await db.query(query, ids)
    
    return res.json(message)
}

// view the item inside the transaction   -> item name , item id, quantity  and user_id 
// need transaction_id  
view_items_in_transaction = (req,res)=>{
    const trans_id = String(req.params.id) 
    const user_id   

}


module.exports = { 
    getOne, 
    getList, 
    getMany, 
    update, 
    remove, 
    create, 
    removeMany, 
    get_transactions_for_user
}

function create_condition_string (length, value){ 
    var array = Array(length).fill(value)
    return array.join()
}