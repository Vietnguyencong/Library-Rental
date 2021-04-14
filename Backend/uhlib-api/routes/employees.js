const  express = require('express');
const router = express.Router();
const employeesService = require("../services/employeesService");

router.get('/', async function(req, res, next) {
    try {
      res.json(await employeesService.getByFilter(
        JSON.parse(req.query.sort),
        JSON.parse(req.query.range),
        JSON.parse(req.query.filter) ));
    } catch (err) {
      console.error(`Get error `, err.message);
      next(err);
    }
});

//Get all Employees
router.get("/all_employees", async function(req, res, next){
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    count = Object.keys( await employeesService.getEmployees(req.query.page) ).length;
    res.set("X-Total-Count", count);
    res.setHeader('Content-Range', count);
    try {
        res.json(await employeesService.getEmployees(req.query.page));
    }
    catch(err){
        console.error(`Get error`, err.message);
        next(err);
    }
});

//Get one employee
router.get("/one/:id", async function (req, res, next){
    const id = String(req.params.id);
    try {
        res.json(await employeesService.getOne(id));
    }
    catch (err){
        console.error(`Get error `, err.message );
        next(err);
    }
});

//Update employee
router.put("/update_employee/:id", async function (req, res, next){
    try {res.json(await employeesService.update(req.params.id, req.body));}
    catch (err) {console.error(`Update error `, err.message);
    next(err);}
});

router.delete("/delete_employee", async function (req, res, next)
{
    try { res.json(await employeesService.remove(req));}
    catch (err) {
        console.error(`Delete error `, err.message);
        next(err);
    }
});

router.post("/create_employee", async function(req, res, next) {
    //let id = req.params.id;
    try { res.json(await employeesService.create(req.body));}
    catch (err) {
        console.error(`Error while creating employee `, err.message);
        next(err);
    }
});
//router.get('/many', getMany)
// router.get("/refer",get_transactions_for_user )
//router.delete("/many",removeMany)
// router.get("/view_all_items/:trans_id", view_items_in_transaction)
module.exports = router 