const path = require('path');

const express = require('express');

const router = express.Router();
var participants = ['Participant 1', 'Participant 2', 'Participant 3'];

router.get('/', (req, res, next) => {
  var participant = req.query.p || "p1";
  var a = req.query.a;
  var removeZeros = req.query.z;
  res.render('index', { participants: participants, participant: participant, title: "First Experiment", removeZeros: removeZeros, types: ['calories', 'heartrate', 'steps', 'distance']});
});

router.get('/second', (req, res, next) => {
  var participant = req.query.p || "p1";
  var removeZeros = req.query.z;
  res.render('second', { participants: participants, participant: participant, title: "Second Experiment", removeZeros: removeZeros, types: ['calories', 'calories2', 'heartrate', 'steps', 'steps2']});
});
router.get('/secondba', (req, res, next) => {
  var participant = req.query.p || "p1";
  var removeZeros = req.query.z;
  res.render('secondba', { participants: participants, participant: participant, title: "Second Experiment", removeZeros: removeZeros, types: ['calories', 'calories2', 'heartrate', 'steps', 'steps2']});
});
router.get('/about', (req, res, next) => {
  var participant = req.query.p || "p1";
  res.render('about', { participants: participants, participant: participant, title: "About Page",  types: ['calories', 'calories2', 'heartrate', 'steps', 'steps2']});
});

module.exports = router;