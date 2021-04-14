const  express = require('express')
const router = express.Router()
const {user_login, user_logout, login} = require("../services/authentication")

router.post("/login", user_login)
router.post("/logout", user_logout)
router.post("/userlogin", login)
module.exports = router 