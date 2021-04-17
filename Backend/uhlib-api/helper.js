const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken")
function cleanRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function create_condition_string (length, value){ 
  var array = Array(length).fill(value)
  return array.join()
}

// the token will expire in 60 mintues 
function generate_access_token(user){
  return jwt.sign(user, process.env.SECRET_KEY, {expiresIn:"1h"})
}

// check if the user has valid token 
authenticate_user = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  if (token == null) return res.status(401).send("Cannot find the token in the header") // unauthorzied 
  // if (db.invalid_tokens.includes(token)) return res.status(401).send("token is expired")
  jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
      if (err) return res.sendStatus(403)    // identified client dont have access to this page 
      req.user = user 
      next()
  })
}

module.exports = {
  cleanRows,
  create_condition_string, 
  generate_access_token,
  authenticate_user
};
