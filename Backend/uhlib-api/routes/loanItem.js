const  express = require('express')
const router = express.Router()
const {getAll, getOne,createOne, editOne, deleteOne, getMany, deleteMany} = require("../services/loanItemService")

router.get("/many", getMany)
router.get("/", getAll )   // add filter in  user_id or by transaction_id 
router.get("/:id", getOne)
router.post("/", createOne)
router.put("/:id", editOne)
router.delete("/one/:id", deleteOne)
router.delete("/many", deleteMany)

module.exports = router