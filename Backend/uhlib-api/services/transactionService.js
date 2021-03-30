var db = require("./db")
var {cleanRows}  = require('../helper')

// http://localhost:3000/transactions/:id 
get  = async (req,res) =>{
    const id = String(req.params.id)  
    if (id == null ){
        return res.json({"data": "no result"}) 
    }
    const query = `SELECT *   FROM TRANSACTION WHERE transaction_id = ? ; `
    const row = await db.query(query, [id])
    const data = cleanRows(row) 
    if ((data).length==0) return res.status(400).send({"message": "not found the instance"})
    return res.json(data)
}

getMultiple = async(req,res) =>{
    const query = `SELECT * FROM TRANSACTION; ` 
    const rows = await db.query(query) 
    const data = cleanRows(rows) 
    res.json(data)
}

update = (req,res) =>{

}


remove = (req,res) =>{ 

}

create = (req,res) =>{

}

get_transactions_user = (req,res) =>{

}




module.exports = { 
    get, 
    getMultiple, 
    update, 
    remove, 
    create, 
    get_transactions_user
}