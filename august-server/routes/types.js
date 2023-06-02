const express = require('express');
const router = express.Router();
const types = require('../services/types');

/* GET senses listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(types.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting senses `, err.message);
    next(err);
  }
});

/* POST sense */
router.post('/add', function(req, res, next) {
  try {
    res.json(types.create(req.body));
  } catch(err) {
    console.error(`Error while adding types `, err.message);
    next(err);
  }
});

router.post('/update', function(req, res, next) {
  try {
    res.json(types.update(req.body));
  } catch(err) {
    console.error(`Error while getting senses `, err.message);
    next(err);
  }
});

router.post('/delete', function(req, res, next) {
  try {
    res.json(types.deleteType(req.body.id));
  } catch(err) {
    console.error(`Error while getting senses `, err.message);
    next(err);
  }
});

module.exports = router;
