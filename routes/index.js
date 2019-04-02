const path = require('path');
const express = require('express');
const router = express.Router();
var participants = ['Participant 1', 'Participant 2', 'Participant 3'];

router.get('/', (req, res, next) => {
  var participant = req.query.p || "p1";
  var a = req.query.a;
  var removeZeros = req.query.z;
  res.render('index', { 
    participantsCount: 10, 
    participants: participants, 
    participant: participant, 
    title: "First Experiment", 
    removeZeros: removeZeros, 
    types: ['calories', 'heartrate', 'steps', 'distance']
  });
});

router.get('/second', (req, res, next) => {
  var participant = req.query.p || "p1";
  var removeZeros = req.query.z;
  res.render('second', { 
    participantsCount: 20, 
    participants: participants, 
    participant: participant, 
    title: "Second Experiment", 
    removeZeros: removeZeros, 
    types: ['calories', 'calories2', 'heartrate', 'steps', 'steps2'],
    titles: ['Energy Consumption in Calories (Cumulative)', 'Energy Consumption in Calories (Discrete)', 'Heart Rate', 'Steps (Cumulative)', 'Steps (Discrete)']});
});
router.get('/download', function(req, res){
  var participant = req.query.p;
  var experiment = req.query.e;
  var type = req.query.type;
  var file = 'public/images/favicon.ico';
  // res.download(file); 
  if (experiment === "2") {
    file = 'public/dataOriginal/sample'+participant.substr(1)+'_treadmillData.xlsx';
  } else if (experiment === "1") {
    file = 'public/dataOriginal/sample'+participant.substr(1)+'_oneWeekData/'+type+".xlsx";
  }
  res.download(file); 
});

router.get('/secondba', (req, res, next) => {
  var participant = req.query.p || "p1";
  var removeZeros = req.query.z;
  var type = req.query.type;
  var typeTitle = req.query.title;
  res.render('secondba', { 
    type: type, 
    typeTitle: typeTitle,
    participants: participants, 
    participant: participant, 
    title: "Second Experiment Bland–Altman", 
    removeZeros: removeZeros, 
    types: ['calories', 'calories2', 'heartrate', 'steps', 'steps2']
  });
});

router.get('/about', (req, res, next) => {
  var participant = req.query.p || "p1";
  res.render('about', { 
    participants: participants, 
    participant: participant, 
    title: "About Page",  
    types: ['calories', 'calories2', 'heartrate', 'steps', 'steps2']
  });
});


module.exports = router;