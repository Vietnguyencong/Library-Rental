const express = require('express');
const router = express.Router();
const getAllCurrentStocksService = require('../services/getAllCurrentStocksService');
const {authenticate_user} = require("../helper")

router.get('/allstocks', authenticate_user, async function(req, res, next) {
    try {
      res.json(await getAllCurrentStocksService.get(req.query.page));
    } catch (err) {
      console.error(`Get error `, err.message);
      next(err);
    }
  });

router.get('/one/:title', authenticate_user, async function(req, res, next) {
let title  = req.params.title;
// console.log('id is ${id}');
try {
    res.json(await getAllCurrentStocksService.getByTitle(title));
} catch (err) {
    console.error(`Get error `, err.message);
    next(err);
}
});

module.exports = router;
