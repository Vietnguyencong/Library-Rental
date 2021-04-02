const express = require('express');
const router = express.Router();
const paidfinesService = require('../services/paidfinesService');

/* GET ALL PAID FINES, HISTORY? */
router.get('/allpaidfines', async function(req, res, next) {
  try {
      res.json(await paidfinesService.get(req.query.page));
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
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await paidfinesService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Update error `, err.message);
    next(err);
  }
});

module.exports = router;