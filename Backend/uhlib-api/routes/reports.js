const express = require('express');
const cors = require('cors');
const router = express.Router();
const reportService = require('../services/reportService');

router.get('/fetchusers', async function(req, res, next) {
    try {
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      count = Object.keys( await reportService.get(req.query.page) ).length;
      res.set("X-Total-Count", count);
      res.setHeader('Content-Range', count);
      res.json({count});
    } catch (err) {
      console.error(`Get error `, err.message);
      next(err);
    }
  });

router.get('/fetchusersloans', async function(req, res, next) {
try {
    count = await reportService.getloans();
    res.json(count);
} catch (err) {
    console.error(`Get error `, err.message);
    next(err);
}
});

router.get('/fetchpieitems', async function(req, res, next) {
    try {
        count = await reportService.getpieitems();
        res.json(count);
    } catch (err) {
        console.error(`Get error `, err.message);
        next(err);
    }
});

module.exports = router