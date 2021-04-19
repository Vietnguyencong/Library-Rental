const db = require('./db');
const helper = require('../helper');


getAll = async (req,res, next) => {
    try{
        console.log("working")
        const query = `select * from EMPLOYEE_NOTIFICATIONS ; `
        console.log(query)

        const rows = await db.query(query, [])
        const data = helper.cleanRows(rows)
        return res.json(data) 
    }catch(err){
        next(err)
    }
}

getOne = async (req,res, next) => {
    try{
        const id = req.params.id
        const query = `select * from EMPLOYEE_NOTIFICATIONS where ID=${id}; `
        const rows =await db.query(query, [])
        const data = helper.cleanRows(rows)
        return res.json(data) 
    }catch(err){
        next(err)
    }
}

module.exports = {
    getAll,
    getOne
}