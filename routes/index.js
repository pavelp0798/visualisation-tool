const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  var participant = req.query.p;
  if (participant == null) {
    participant = "p1";
  }
  var a = req.query.a;

  res.render('index', { participant: participant, title: "First Experiment", a: a});
});
router.get('/second', (req, res, next) => {
  var participant = req.query.p;
  res.render('second', { participant: participant, title: "Second Experiment"});
});

module.exports = router;