const  express = require('express')
const router = express.Router()
const {getAll, getOne,createOne, editOne, deleteOne, getMany} = require("../services/loanItemService")

router.get("/many", getMany)
router.get("/", getAll )   // add filter in  user_id or by transaction_id 
router.get("/:id", getOne)
router.post("/", createOne)
router.put("/:id", editOne)
router.delete("/:id", deleteOne)

module.exports = router