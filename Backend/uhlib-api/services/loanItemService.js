var db = require("./db")
var {cleanRows}  = require('../helper')
const {v4:uuidv4} = require("uuid")
const { json } = require("express")
const e = require("express")

// description: get one item in loan_item table 
// route:  loan_item/one/:id 
// params: transaction id and item id 
getOne = async (req,res, next)=>{
    try{
        const id  = req.params.id   
        const query = `select * from LOAN_ITEM where id = ?;`
        const rows = await db.query(query, [id])
        const data  = cleanRows(rows)
        return res.json(data)
    }catch(err){
        next(err)
    }
}
// description: get many loan items 
// route:  /many?filter={"id":[1,2,3]}
// params: 
getMany = async (req,res, next) =>{
    try{
        const ids = JSON.parse(req.query.filter).id
        const condition_tring = create_condition_string(ids.length, "?")
        const query = `SELECT * from LOAN_ITEM where id in (${condition_tring});`
        const rows = await db.query(query, ids)
        const data = cleanRows(rows)
        return res.json(data)
    }catch(err){
        next(err)
    }
}

// description: get all the items in loan_item tbale 
// route:  /?filter={"item_id":2, "transaction_id":"djfkhkdjfhkjahkjdf"}
// params: 
getAll = async(req,res,next)=>{
    try{
        var context = JSON.parse(req.query.filter)
        if ( JSON.stringify(context) !== "{}" ){
            const keys = Object.keys(context)
            var conditions = []
            var params = []
            console.log(keys)
            for (var i=0; i<keys.length; i++){
                conditions.push(`${[keys[i]]}=?`) 
                params.push(context[keys[i]])
            }
            var condition_tring = conditions.join(" and ")
            var query = `SELECT * from LOAN_ITEM where ${condition_tring} ;` 
            console.log(condition_tring)
            console.log(query)
            const rows = await db.query(query, params)
            const data = cleanRows(rows)
            return res.json(data)
              // if ("item_id" in context &&  "transaction_id" in context ){
            //     query = `SELECT * from LOAN_ITEM where item_id=? and transaction_id =? ;`
            //     const item_id = context.item_id 
            //     const transaction_id = context.transaction_id
            //     params = [item_id, transaction_id]
            // }else if ("item_id" in context){
            //     query = `SELECT * from LOAN_ITEM where item_id=? and transaction_id =? ;`
            // }else{
            // }
        }else{
            const query = `SELECT * from LOAN_ITEM; `
            const rows = await db.query(query, []) 
            const data = cleanRows(rows)
            return res.json(data)
        }
        
    }catch(err){
        next(err)
    }
   
}

// description: update one loan_item in quanitty ONLY 
// route:  loan_item/one/:trans_id/:item_id/:quantity  
// params: item_id, transaction_id , quantity, duedate  
editOne = async (req,res ,next) =>{
    try{
        const id = req.params.id

        const is_due = (req.body.is_due) 
        const quantity = parseInt(req.body.quantity)
        const query = `UPDATE LOAN_ITEM SET quantity = ?, is_due= ? WHERE id = ?; `
        const rows = await db.query(query, [quantity, is_due, id])
        const data = cleanRows(rows)
        return res.json(data)
    }
    catch(err){
        next(err)
    }
}


// description: delete one item in loan item table 
// route: delelete loan_item/one/:trans_id/:item_id 
// params: :trans_id and item_id  
deleteOne  = async (req,res, next) =>{
    try{
        const id = req.params.id
        const query = `DELETE FROM LOAN_ITEM where id = ? ; `
        const rows = await db.query(query, [id]) 
        const data = cleanRows(rows)
        return res.json(data)
    }catch(err){
        next(err)
    }
 
}

// description: create one item in loan item table 
// route: delelete loan_item/one/:trans_id/:item_id/:quantity  
// params: transaction_id, item_id and quantity 
createOne = async (req,res, next) =>{
    try{
        const trans_id = req.body.transaction_id 
        const item_id = req.body.item_id 
        const quantity = req.body.quantity
        const query = `INSERT INTO LOAN_ITEM  (item_id , quantity, transaction_id)
        VALUES (?, ?, ? );`
        const params = [item_id, quantity, trans_id] 
        const rows = await db.query(query, params)
        const data = cleanRows(rows)
        return res.json(data)
    }catch(err){
        next(err)
    }
}

module.exports = {
    getOne, 
    getAll,
    editOne, 
    deleteOne, 
    createOne, 
    getMany
}


function create_condition_string (length, value){ 
    var array = Array(length).fill(value)
    return array.join()
}