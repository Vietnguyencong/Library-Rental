const  express = require('express')
const router = express.Router()
const {getOne, getMany,getList ,update, remove, create, get_transactions_for_user, removeMany} = require("../services/transactionService")


router.get("/one/:id", getOne) 

router.get('/many', getMany)

router.get("/", getList)

router.put("/:id", update) 

router.delete("/:id", remove)

router.post("/", create)

router.get("/refer",get_transactions_for_user )

router.delete("/many",removeMany)



module.exports = router 


 