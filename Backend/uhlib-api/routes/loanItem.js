const  express = require('express')
const router = express.Router()
<<<<<<< HEAD
const {getAll, getOne,createOne, editOne, deleteOne, getMany} = require("../services/loanItemService")

router.get("/many", getMany)
router.get("/", getAll )   // add filter in  user_id or by transaction_id 
router.get("/:id", getOne)
router.post("/", createOne)
router.put("/:id", editOne)
router.delete("/:id", deleteOne)
=======
const {getAll, getOne,createOne, editOne, deleteOne} = require("../services/loanItemService")


router.get("/", getAll )  
router.get("/:trans_id/:item_id", getOne)
router.post("/", createOne)
router.put("/:trans_id/:item_id", editOne)
router.delete("/:trans_id/:item_id", deleteOne)
>>>>>>> upstream/main

module.exports = router