const  express = require('express')
const router = express.Router()
const {getOne, getMany,getList ,update, remove, create, get_transactions_user} = require("../services/transactionService")


router.get("/:id", getOne) 

router.get("/", getList)

router.put("/:id", update) 

router.delete("/:id", remove)

router.post("/", create)

router.get("/:user_id",get_transactions_user )

module.exports = router 


 