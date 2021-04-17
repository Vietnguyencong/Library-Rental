const express = require('express');
const cors = require('cors');
const router = express.Router();
const waitinglistService = require('../services/waitinglistService');

// GET ALL ITEMS IN WAITING LIST
router.get('/allwaitinglist', async function(req, res, next) {
    try {
        res.json(await waitinglistService.getwaitinglist(req.query.page));
      } catch (err) {
        console.error(`Get error `, err.message);
        next(err);
      }
    });

// GET WAITING LIST FROM PK id
router.get('/:id', async function(req, res, next) {
  let id  = req.params.id;
   try {
      res.json(await waitinglistService.getOne(id));
    } catch (err) {
      console.error(`Get error `, err.message);
      next(err);
    }
  });


// GET WAITING LIST FROM A ITEM ID
router.get('/book/:id', async function(req, res, next) {
    let id  = req.params.id;
     try {
        res.json(await waitinglistService.getBookList(id));
      } catch (err) {
        console.error(`Get error `, err.message);
        next(err);
      }
    });


// GET WAITING LIST FROM A USER ID
router.get('/user/:id', async function(req, res, next) {
    let id  = req.params.id;
     try {
        res.json(await waitinglistService.getUserList(id));
      } catch (err) {
        console.error(`Get error `, err.message);
        next(err);
      }
    });

/* POST ITEMS */
router.post('/', async function(req, res, next) {
    try {
      res.json(await waitinglistService.create(req.body));
    } catch (err) {
      console.error(`Error while creating item`, err.message);
      next(err);
    }
  });


  /* UPDATE ITEM BY ID */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await waitinglistService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Update error `, err.message);
    next(err);
  }
});

// DELETE ONE 
router.delete('/deleteOne', async function(req, res, next) {
    try {
        res.json(await waitinglistService.removeOne(req));
        } catch (err) {
        console.error(`Delete error `, err.message);
        next(err);
        }
    }); 



// DELETE USER FROM ALL WAITING LIST
router.delete('/deleteUserList', async function(req, res, next) {
    try {
        res.json(await waitinglistService.removeUser(req));
        } catch (err) {
        console.error(`Delete error `, err.message);
        next(err);
        }
    });
    

// DELETE ITEM FROM ALL WAITING LIST
router.delete('/deleteItemList', async function(req, res, next) {
    try {
        res.json(await waitinglistService.removeItem(req));
        } catch (err) {
        console.error(`Delete error `, err.message);
        next(err);
        }
    });

    router.get('/many',itemsService.getMany )
module.exports = router;