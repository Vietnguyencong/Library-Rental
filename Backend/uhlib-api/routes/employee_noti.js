const { Router } = require('express');
const express = require('express');
const router = express.Router();
const employe_notiService = require('../services/employee_notiService');

router.get('/getall', employe_notiService.getAll)
router.get('/one/:id', employe_notiService.getOne)

module.exports = router