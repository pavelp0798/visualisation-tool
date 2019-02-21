const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  var participant = req.query.p;
  res.render('index', { participant: participant });
});

module.exports = router;