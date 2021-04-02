const express = require('express');
const router = express.Router();
const notificationsService = require('../services/notificationsService');

router.get('/allnotifications', async function(req, res, next) {
    try {
        res.json(await notificationsService.get(req.query.page));
      } catch (err) {
        console.error(`Get error `, err.message);
        next(err);
      }
    });

module.exports = router;