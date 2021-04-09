const  express = require('express')
const router = express.Router()
const { getOne, getMany,getList ,update, remove, create, get_transactions_for_user, removeMany, view_items_in_transaction} = require("../services/transactionsService")
const {authenticate_user} = require("../helper")

router.get("/one/:id", authenticate_user, getOne) 
router.get('/many',authenticate_user, getMany)
// router.get("/", getList)
router.put("/:id",authenticate_user, update) 
router.delete("/:id",authenticate_user, remove)
router.post("/", authenticate_user,create)
router.get("/",authenticate_user,get_transactions_for_user ) // replace for get list
router.delete("/many",authenticate_user,removeMany)
router.get("/view_all_items/:trans_id",authenticate_user, view_items_in_transaction)


// router.get("/one/:id", getOne) 
// router.get('/many', getMany)
// // router.get("/", getList)
// router.put("/:id", update) 
// router.delete("/:id", remove)
// router.post("/",create)
// router.get("/",get_transactions_for_user ) // replace for get list
// router.delete("/many",removeMany)
// router.get("/view_all_items/:trans_id", view_items_in_transaction)
module.exports = router 

