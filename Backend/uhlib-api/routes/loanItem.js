const  express = require('express')
const router = express.Router()
const {getAll, getOne,createOne, editOne, deleteOne} = require("../services/loanItemService")


router.get("/", getAll )  
router.get("/:trans_id/:item_id", getOne)
router.post("/", createOne)
router.put("/:trans_id/:item_id", editOne)
router.delete("/:trans_id/:item_id", deleteOne)

module.exports = router