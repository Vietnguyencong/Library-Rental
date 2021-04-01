const express = require('express');
const router = express.Router();
const itemsService = require('../services/paidfinesService');

router.get('/allpaidfines', async function(req, res, next) {
    try {
      res.json(await itemsService.get(req.query.page));
    } catch (err) {
      console.error(`Get error `, err.message);
      next(err);
    }
  });

module.exports = router;