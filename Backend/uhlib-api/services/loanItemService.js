var db = require("./db")
var {cleanRows}  = require('../helper')
const {v4:uuidv4} = require("uuid")
const { json } = require("express")

// description: get one item in loan_item table 
// route:  loan_item/one/:id 
// params: transaction id and item id 
getOne = async (req,res)=>{
    const transaction_id  = req.params.trans_id   
    const item_id = req.params.item_id 
    const query = `select * from LOAN_ITEM where transaction_id = ? and item_id = ? ;`
    const params = [transaction_id, item_id]
    const rows = await db.query(query, params)
    const data  = cleanRows(rows)
    return res.json(data)
    
}

// description: get all the items in loan_item tbale 
// route:  loan_item/
// params: 
getAll = async(req,res)=>{
    const query = `SELECT * from LOAN_ITEM; `
    const rows = await db.query(query, []) 
    const data = cleanRows(rows)
    return res.json(data)
}

// description: update one loan_item in quanitty ONLY 
// route:  loan_item/one/:trans_id/:item_id/:quantity  
// params: item_id, transaction_id , quantity, duedate  
editOne = async (req,res) =>{
    const trans_id = req.params.trans_id
    const item_id = req.params.item_id 
    const quantity = parseInt(req.body.quantity)
    const query = `UPDATE LOAN_ITEM set quantity = ? where 
    transaction_id = ? and item_id = ? ; `
    const params = [quantity, trans_id, item_id]
    const rows = await db.query(query, params)
    const data = cleanRows(rows)
    return res.json(data)
}


// description: delete one item in loan item table 
// route: delelete loan_item/one/:trans_id/:item_id 
// params: :trans_id and item_id  
deleteOne  = async (req,res) =>{
    const trans_id = req.params.trans_id 
    const item_id = req.params.item_id 
    const query = `DELETE FROM LOAN_ITEM where transaction_id = ? and  item_id  = ?; `
    const params = [trans_id, item_id]
    const rows = await db.query(query, params) 
    const data = cleanRows(rows)
    return res.json(data)
}

// description: create one item in loan item table 
// route: delelete loan_item/one/:trans_id/:item_id/:quantity  
// params: transaction_id, item_id and quantity 
createOne = async (req,res) =>{
    const trans_id = req.body.trans_id 
    const item_id = req.body.item_id 
    const quantity = req.body.quantity
    const query = `INSERT INTO LOAN_ITEM  (item_id , quantity, transaction_id)
    VALUES (?, ?, ? );`
    const params = [item_id, quantity, trans_id] 
    const rows = await db.query(query, params)
    const data = cleanRows(rows)
    return res.json(data)

}

module.exports = {
    getOne, 
    getAll,
    editOne, 
    deleteOne, 
    createOne
}
