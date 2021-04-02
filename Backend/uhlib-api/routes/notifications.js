const express = require('express');
const router = express.Router();
const notificationsService = require('../services/notificationsService');

router.get('/allusersnotifications', async function(req, res, next) {
    try {
        res.json(await notificationsService.getUsers(req.query.page));
      } catch (err) {
        console.error(`Get error `, err.message);
        next(err);
      }
    });

router.get('/user/:id', async function(req, res, next) {
    let id  = req.params.id;
     try {
        res.json(await notificationsService.getSingleUser(id));
      } catch (err) {
        console.error(`Get error `, err.message);
        next(err);
      }
    });

router.get('/allemployeesnotifications', async function(req, res, next) {
    try {
        res.json(await notificationsService.getEmployees(req.query.page));
        } catch (err) {
        console.error(`Get error `, err.message);
        next(err);
        }
    });

router.get('/employee/:id', async function(req, res, next) {
    let id  = req.params.id;
    try {
        res.json(await notificationsService.getSingleEmployee(id));
        } catch (err) {
        console.error(`Get error `, err.message);
        next(err);
        }
    });



    //NOT WORKING?
router.delete('/deleteUserNotification/:id', async function(req, res, next) {
    id = req.params.id;
    try {
        res.json(await notificationsService.removeUserNotification(id));
        } catch (err) {
        console.error(`Delete error `, err.message);
        next(err);
        }
    });

module.exports = router;