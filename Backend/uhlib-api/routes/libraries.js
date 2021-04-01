const express = require('express');
const router = express.Router();
const librariesService = require('../services/librariesService');
// GET ALL
router.get('/all_libraries', async function(req, res, next) {
    try {
      res.json(await librariesService.get(req.query.page));
    } catch (err) {
      console.error(`Get error `, err.message);
      next(err);
    }
});
  
  // GET BY ID
router.get('/id/:id', async function(req, res, next) {
  const id = req.params.id;
  try {
    res.json(await librariesService.getID(id));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});
  // GET BY NAME
router.get('/name/:name', async function(req, res, next) {
  const name = req.params.name;
  try {
    res.json(await librariesService.getName(name));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});
  // GET BY LOCATION
router.get('/Location/:location', async function(req, res, next) {
  const location = req.params.location;
  try {
    res.json(await librariesService.getLocation(location));
  } catch (err) {
    console.error(`Get error `, err.message);
    next(err);
  }
});
  // CREATE
router.post('/createlibrary', async function(req, res, next) {
  console.log('Create library /')
  try {
    res.json(await librariesService.create(req.body));
  } catch (err) {
    console.error(`Error while creating new library`, err.message);
    next(err);
  }
});
  // UPDATE
  router.put('/updatelibrary/:id', async function(req, res, next) {
    
  try {
    res.json(await librariesService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Update error `, err.message);
    next(err);
  }
  });
  // DELETE
router.delete('/deletelibrary', async function(req, res, next) {
  
  try {
    res.json(await librariesService.remove(req));
  } catch (err) {
    console.error(`Delete error `, err.message);
    next(err);
  }
});
  module.exports = router;