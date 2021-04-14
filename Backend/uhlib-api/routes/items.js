const express = require('express');
const router = express.Router();
const itemsService = require('../services/itemsService');
const {authenticate_user} = require("../helper")

/* GET ITEMS WITH FILTER */
router.get('/',authenticate_user, async function(req, res, next) {
    try {
      res.json(await itemsService.getByFilter(
        JSON.parse(req.query.sort),
        JSON.parse(req.query.range),
        JSON.parse(req.query.filter) ));
    } catch (err) {
      console.error(`Get error `, err.message);
      next(err);
    }
});

/* GET ITEMS */
router.get('/allitems', authenticate_user, async function(req, res, next) {
  try {
    res.json(await itemsService.get(req.query.page));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});

/* GETITEM BY ID */
router.get('/one/:id', authenticate_user, async function(req, res, next) {
  let id  = req.params.id;
  // console.log('id is ${id}');
  try {
    res.json(await itemsService.getItem(id));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});

/* POST ITEMS */
router.post('/', authenticate_user, async function(req, res, next) {
  console.log('Create new item /')
  try {
    res.json(await itemsService.create(req.body));
  } catch (err) {
    console.error(`Error while creating item`, err.message);
    next(err);
  }
});

/* UPDATE ITEM BY ID */
router.put('/:id', authenticate_user, async function(req, res, next) {
  console.log('id is ${id}');
  try {
    res.json(await itemsService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Update error `, err.message);
    next(err);
  }
});

/* DELETE ITEM */
router.delete('/deleteitem', authenticate_user, async function(req, res, next) {
  console.log('id is ${id}');
  try {
    res.json(await itemsService.remove(req));
  } catch (err) {
    console.error(`Delete error `, err.message);
    next(err);
  }
});

router.get("/filter",itemsService.getItemByTitle)

router.get('/many',itemsService.getMany )
router.get("/getall", itemsService.getAll)
module.exports = router;
