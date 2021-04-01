const  express = require('express')
const router = express.Router()
const {getOne, getMany,getList ,update, remove, create, get_transactions_for_user, removeMany, view_items_in_transaction} = require("../services/transactionsService")

router.get("/one/:id", getOne) 
router.get('/many', getMany)
router.get("/", getList)
router.put("/:id", update) 
router.delete("/:id", remove)
router.post("/", create)
router.get("/refer",get_transactions_for_user )
router.delete("/many",removeMany)
router.get("/view_all_items/:trans_id", view_items_in_transaction)
module.exports = router 

