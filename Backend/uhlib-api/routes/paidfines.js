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



module.exports = router;