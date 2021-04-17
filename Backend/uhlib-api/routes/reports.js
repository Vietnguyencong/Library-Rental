const express = require('express');
const cors = require('cors');
const router = express.Router();
const reportService = require('../services/reportService');
const moment = require('moment');

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

router.get('/fetchusersdate', async function(req, res, next) {
    try {
        let date1 = moment(new Date(req.query.date1)).format("yyyy-MM-DD");
        let date2 = moment(new Date(req.query.date2)).format("yyyy-MM-DD");
        // console.log('date  date2 ',date1,date2);
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      count = Object.keys( await reportService.get(date1, date2)).length;
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
    let date1 = moment(new Date(req.query.date1)).format("yyyy-MM-DD");
    let date2 = moment(new Date(req.query.date2)).format("yyyy-MM-DD");
    // console.log('date  date2 ',date1,date2);
    count = await reportService.getloans(date1, date2);
    res.json(count);
} catch (err) {
    console.error(`Get error `, err.message);
    next(err);
}
});

router.get('/totalfinespaid', async function(req, res, next) {
    try {
        count = await reportService.getfinespaid();
        res.json(count);
    } catch (err) {
        console.error(`Get error `, err.message);
        next(err);
    }
});

router.get('/fetchpieitems', async function(req, res, next) {
    try {
      let date1 = moment(new Date(req.query.date1)).format("yyyy-MM-DD");
      let date2 = moment(new Date(req.query.date2)).format("yyyy-MM-DD");
    console.log('date pie date2 ',date1,date2);
    console.log(JSON.stringify(req.query));

        count = await reportService.getpieitems(date1, date2);
        res.json(count);
    } catch (err) {
        console.error(`Get error `, err.message);
        next(err);
    }
});

module.exports = router