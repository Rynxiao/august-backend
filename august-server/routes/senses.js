const express = require('express');
const router = express.Router();
const senses = require('../services/senses');

router.get('/', senses.findAll);

router.post('/add', senses.create);

router.post('/update', senses.update);

router.post('/delete', senses.delete);

module.exports = router;
