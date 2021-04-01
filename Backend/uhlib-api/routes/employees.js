const  express = require('express')
const router = express.Router()
const {getOne, getEmployees, getMany,update, remove, create, removeMany } = require("../services/employeesService")

router.get("/one/:id", getOne) 
router.get("/", getEmployees) 

router.get('/many', getMany)

router.put("/:id", update) 
router.delete("/:id", remove)
router.post("/", create)
// router.get("/refer",get_transactions_for_user )
router.delete("/many",removeMany)
// router.get("/view_all_items/:trans_id", view_items_in_transaction)
module.exports = router 