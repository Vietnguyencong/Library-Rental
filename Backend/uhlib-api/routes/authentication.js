const  express = require('express')
const router = express.Router()
const {user_login, user_logout} = require("../services/authentication")

router.post("/login", user_login)
router.post("/logout", user_logout)

module.exports = router 