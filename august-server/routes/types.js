const express = require('express');
const router = express.Router();
const types = require('../services/types');

router.get('/', types.findAll);

router.post('/add', types.create);

router.post('/update', types.update);

router.post('/delete', types.delete);

module.exports = router;
