var db = require("./db")
var {cleanRows, create_condition_string, generate_access_token}  = require('../helper') 
const jwt = require('jsonwebtoken')
// const bcrypt = require("bcrypt")

user_login  = async (req,res,next) =>{
    const email = req.body.email 
    const password = req.body.password
    const params = [email]
    const query = `select * from EMPLOYEES where email_address =?; `
    const rows = await db.query(query, params)
    if(rows.length == 0 ){
        return res.status(401).send(" user just not exist in the db")
    } 
    // get the user passsword 
    const user_password = rows[0].password
   
    try{
        if (user_password === password){ // authentication 
            const user = {
                email:email
            }
            const access_token = generate_access_token(user)
            return res.json({
                access_token: access_token
            })
        }else{
            return res.status(401).send("user password or email is wrong")
        }
    }catch(err){
        next(err)
    }

}
user_logout = (req,res)=>{
    const header_auth = req.headers['authorization']
    const user_token = header_auth && header_auth.split(" ")[1]
    if (user_token == null) return  res.sendStatus(401)
    // delete or push the token into an cannot-use token 
    res.send("logout the user")
}

module.exports = {
    user_login,
    user_logout,
}
