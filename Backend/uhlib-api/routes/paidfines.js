const express = require('express');
const cors = require('cors');
const router = express.Router();
const paidfinesService = require('../services/paidfinesService');

/* GET ALL PAID FINES, HISTORY? */
router.get('/allpaidfines', async function(req, res, next) {
  try {
      res.json(await paidfinesService.getAll(req.query.page));
    } catch (err) {
      console.error(`Get error `, err.message);
      next(err);
    }
  });


/* GET USER BY ID */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await paidfinesService.getUser(req.params.id));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});



/* POST ITEMS */
router.post('/', async function(req, res, next) {
  
  try {
    res.json(await paidfinesService.create(req.body));
  } catch (err) {
    console.error(`Error while creating item`, err.message);
    next(err);
  }
});

/* UPDATE ITEM BY ID */
router.put('/:id/:item_id', async function(req, res, next) {
  try {
    res.json(await paidfinesService.update(req.params.id, req.params.item_id, req.body));
  } catch (err) {
    console.error(`Update error `, err.message);
    next(err);
  }
});


router.get('/', async function(req, res, next) {
  try {
    res.json(await paidfinesService.getByuserF(
      JSON.parse(req.query.filter)));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});


/* DELETE ITEM */
router.delete('/deletepaidfines', async function(req, res, next) {
  try {
    res.json(await paidfinesService.remove(req));
  } catch (err) {
    console.error(`Delete error `, err.message);
    next(err);
  }
});

module.exports = router;