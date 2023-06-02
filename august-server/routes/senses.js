const express = require('express');
const router = express.Router();
const senses = require('../services/senses');

/* GET senses listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(senses.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting senses `, err.message);
    next(err);
  }
});

/* POST sense */
router.post('/add', function(req, res, next) {
  try {
    res.json(senses.create(req.body));
  } catch(err) {
    console.error(`Error while adding senses `, err.message);
    next(err);
  }
});

router.post('/update', function(req, res, next) {
  try {
    res.json(senses.update(req.body));
  } catch(err) {
    console.error(`Error while getting senses `, err.message);
    next(err);
  }
});

router.post('/delete', function(req, res, next) {
  try {
    res.json(senses.deleteSense(req.body.id));
  } catch(err) {
    console.error(`Error while getting senses `, err.message);
    next(err);
  }
});

module.exports = router;
