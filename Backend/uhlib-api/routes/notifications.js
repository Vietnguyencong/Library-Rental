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

    router.get('/OneEmployee/:id', async function(req, res, next) {
        let id  = req.params.id;
        try {
            res.json(await notificationsService.getOneEmployeeNotification(id));
            } catch (err) {
            console.error(`Get error `, err.message);
            next(err);
            }
        });



// DELETE ONE NOTIFICATION FOR USER
router.delete('/deleteOneUserNotification', async function(req, res, next) {
    try {
        res.json(await notificationsService.removeOneUserNotification(req));
        } catch (err) {
        console.error(`Delete error `, err.message);
        next(err);
        }
    });



    // DELETE ALL NOTIFICATION OF ONE USER
router.delete('/deleteUserNotification', async function(req, res, next) {
    
    try {
        res.json(await notificationsService.removeUserNotification(req));
        } catch (err) {
        console.error(`Delete error `, err.message);
        next(err);
        }
    });


// DELETE ONE NOTIFICATION FOR EMPLOYEE
router.delete('/deleteOneEmployeeNotification', async function(req, res, next) {
    try {
        res.json(await notificationsService.removeOneEmployeeNotification(req));
        } catch (err) {
        console.error(`Delete error `, err.message);
        next(err);
        }
    });

// DELETE ALL NOTIFICATION OF ONE EMPLOYEE
router.delete('/deleteEmployeeNotification', async function(req, res, next) {
    try {
        res.json(await notificationsService.removeEmployeeNotification(req));
        } catch (err) {
        console.error(`Delete error `, err.message);
        next(err);
        }
    });
    
    router.get('/', async function(req, res, next) {
        try {
          res.json(await notificationsService.FilterE(
            JSON.parse(req.query.filter)));
        } catch (err) {
          console.error(`Get error `, err.message);
          next(err);
        }
      });



module.exports = router;