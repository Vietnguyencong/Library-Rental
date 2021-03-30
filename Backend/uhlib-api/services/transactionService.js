var db = require("./db")
var {cleanRows}  = require('../helper')
const { json } = require("express")


// GET / 
getList = async(req,res) =>{
    const query = `SELECT * FROM TRANSACTION; ` 
    const rows = await db.query(query) 
    const data = cleanRows(rows) 
    if ((data).length==0) return res.status(400).send({"message": "not found the instance"})
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
    if ((data).length==0) return res.status(400).send({"message": "not found the instance"})
    return res.json(data)
}
// GET /posts?filter={"id":[123,456,789]}
getMany  = async (req,res)=>{

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
    console.log(message)
    return res.json(message)
}

updateMany = async (req,res)=>{

}


remove = (req,res) =>{ 

}

removeMany = (req,res)=>{

}

create = (req,res) =>{
    
}

get_transactions_user = (req,res) =>{

}




module.exports = { 
    getOne, 
    getList, 
    getMany, 
    update, 
    remove, 
    create, 
    get_transactions_user
}