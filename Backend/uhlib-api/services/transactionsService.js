var db = require("./db")
var {cleanRows}  = require('../helper')
const {v4:uuidv4} = require("uuid")
const { json } = require("express")
const e = require("express")

// GET / 
getList = async(req,res, next) =>{
    try{
        // console.log(req.query)
        const query = `SELECT * FROM TRANSACTION; ` 
        const rows = await db.promisePool.query(query) 
        const data = cleanRows(rows[0]) 
        res.json(data)
    }catch(err){
        next(err)
    }
}
// main get list function 
get_transactions_for_user = async (req,res, next) =>{
    try{
        const context = JSON.parse(req.query.filter)
        if (JSON.stringify(context) !== "{}"){
            const key = Object.keys(context)[0]
            const value = context[key]
            var query = `SELECT *  FROM   TRANSACTION  where ${key}  = ? ;  `
            var rows = await db.promisePool.query(query, [value]) 
            if (rows.length == 0 ){
                var query = `SELECT * from TRANSACTION; `
                var rows = await db.promisePool.query(query, [])
            }
            const data = cleanRows(rows[0])
            return res.json(data)
        }
        else{
            var query = `SELECT * from TRANSACTION; `
            var rows = await db.promisePool.query(query, [])
            const data = cleanRows(rows[0])
            return res.json(data)
        }
    }catch(err) {
        next(err)
    }
}


// http://localhost:3000/transactions/one/:id 
getOne  = async (req,res, next) =>{
    try{
        const id = String(req.params.id)  
        if (id == null ){
            return res.status(400).send({"message": "no result"}) 
        }
        const query = `SELECT *  FROM TRANSACTION WHERE transaction_id = ? ; `
        const row = await db.promisePool.query(query, [id])
        const data = cleanRows(row[0]) 
        return res.json(data)
    }catch(err){
        next(err)
    }
}
// GET /posts/many?filter={"id":[123,456,789]}
getMany = async (req,res) =>{
    const ids = JSON.parse(req.query.filter).id
    if (ids == null) return res.status(400).send({"message": "cannot find the data"})
    var condition_tring = create_condition_string(ids.length, "?") // ?,?,?
    // console.log("id is ", condition_tring);
    const query = `SELECT * FROM  TRANSACTION WHERE transaction_id  in ( ${condition_tring} ) ;`
    const rows = await db.promisePool.query(query, ids)
    const data = cleanRows(rows[0])
    
    return res.json(data)
}
// PUT /posts/123 
update = async (req,res, next) =>{
    try{
        const id = (req.params.id)
        // console.log(id)
        if (id == null) return res.status(400).send({"message": "cannot find the data"})
    
        const user_id = req.body.user_id 
        var is_commit = req.body.is_commit
        if (is_commit == true) is_commit = 1 
        else is_commit = 0
        const date_created =  req.body.date_created.split("T")[0]
        // const updated_at = req.body.updated_at

        const query = `UPDATE TRANSACTION
        SET user_id = ?, is_commit =?, date_created = ?
        WHERE transaction_id = ?; `
        const data =[ user_id , is_commit, date_created, id ] 
    
        const message = await db.promisePool.query(query, data)
        return res.json(message)
        
    }catch(err){
        next(err)
    }
}
// PUT http://my.api.url/posts?filter={"id":[123,124,125]}
updateMany = async (req,res)=>{
    const ids = JSON.parse(req.query.filter).id
    if (ids == null) return res.status(400).send({"message": "cannot find the data"})
    
    const query = `UPDATE TRANSACTION SET user_id WHERE transaction_id  in (${create_condition_string(ids.length,"?")}} ) ;`
    const  message = await db.promisePool.query(query, ids)
    
    return res.json(message)
}

// POST  /transactions // need user_id and create user transaction_id // date_created auto fill 
create = async(req,res, next) =>{
    try{
        const user_id = req.body.user_id
        const newId = uuidv4() 
        const query = `INSERT INTO TRANSACTION (transaction_id, user_id ) VALUES ( ?, ? ) ;` 
        const data = [newId, user_id] 
        const message = await db.promisePool.query(query, data)
        const query2 = `SELECT transaction_id from TRANSACTION where user_id = ? and is_commit = 0 limit 1;` 
        const transaction_id = await db.promisePool.query(query2, req.body.user_id);
        return res.json(cleanRows(transaction_id)[0][0])
    } catch(err){
        next(err)
    }
}
//GET  transactiosn/references?filter = {"user_id " : 1 } 

//DELETE http://my.api.url/posts/:id 
remove = async (req,res) =>{ 
    const id = req.params.id 
    if (id == null) return res.status(400).send({"message": "cannot find the data to update"})
    const query = `DELETE  FROM TRANSACTION WHERE transaction_id = ? ; `
    const message = await db.promisePool.query(query, [id])
    return res.json(message)
}
// DELETE http://my.api.url/posts/many?filter={"id":[123,124,125]}
removeMany = async(req,res)=>{
    const ids = JSON.parse(req.query.filter).id 
    if (ids == null) return res.status(400).send({"message": "cannot find the data to delete"})
    const query = `DELETE FROM TRANSACTION  WHERE transaction_id  IN (${create_condition_string(ids.length, "?")}) ;`
    const  message = await db.promisePool.query(query, ids)
    
    return res.json(message)
}

// view the item inside the transaction   -> item name , item id, quantity  and user_id 
// need transaction_id  
view_items_in_transaction = async (req,res)=>{
    const trans_id = String(req.params.trans_id) 
    // const query = `select l.transaction, t.user_id, l.item_id, l.quantity, t.is_commit from LOAN_ITEM l inner join TRANSACTION t ON  l.transaction_id = t.transaction_id and where t.transaction_id = ?; `
    const query = `select * from LOAN_ITEM l inner join TRANSACTION t ON  l.transaction_id = t.transaction_id where t.transaction_id = ?; `
    const rows = await db.promisePool.query(query, [trans_id, ]) 
    const result = cleanRows(rows[0])
    return res.json(result)
}

search_by_user_name  = async (req,res, next)=>{
    try{
        const search = req.query.filter
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
            var query = `SELECT * from TRANSACTION where ${condition_tring} ;` 
            // console.log(query)
            const rows = await db.promisePool.query(query, [])
            const data = cleanRows(rows[0])
            return res.json(data)
            
        }else{
            const query = `SELECT * from TRANSACTION; `
            const rows = await db.promisePool.query(query, []) 
            const data = cleanRows(rows[0])
            return res.json(data)
        }
        
    }catch(err){
        next(err)
    }
   
  }

module.exports = { 
    getOne, 
    getList, 
    getMany, 
    update, 
    remove, 
    create, 
    removeMany, 
    get_transactions_for_user, 
    view_items_in_transaction,
    getAll
}




function create_condition_string (length, value){ 
    var array = Array(length).fill(value)
    return array.join()
}