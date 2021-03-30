const  express = require('express')
const router = express.Router()
const {get, getMultiple, update, remove, create, get_transactions_user} = require("../services/transactionService")


router.get("/:id", get) 

router.get("/", getMultiple)

router.put("/:id", update) 

router.delete("/:id", remove)

router.post("/", create)

router.get("/:user_id",get_transactions_user )

module.exports = router 


 