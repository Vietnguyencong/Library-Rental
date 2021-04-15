const  express = require('express')
const router = express.Router()
const {user_login, user_logout, login} = require("../services/authentication")
const {authenticate_user} = require("../helper")

router.post("/login", user_login) //admin
router.post("/logout", authenticate_user, user_logout) 
router.post("/userlogin", login) //client
module.exports = router 