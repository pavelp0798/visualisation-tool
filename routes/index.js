const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  var participant = req.query.p;
  if (participant == null) {
    participant = "p1";
  }
  res.render('index', { participant: participant, title: "First Experiment" });
});
router.get('/second', (req, res, next) => {
  res.render('second', {title: "Second Experiment"});
});

module.exports = router;