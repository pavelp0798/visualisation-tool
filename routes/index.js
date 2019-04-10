const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const pcorr = require('compute-pcorr');

var participants = ['Participant 1', 'Participant 2', 'Participant 3'];

router.get('/', (req, res, next) => {
  var participant = req.query.p || "p1";
  var a = req.query.a;
  var removeZeros = req.query.z;
  let names = ['Time', 'Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5'];
  let days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
  let stepsDays = [];
  let caloriesDays = [];
  let distanceDays = [];
  let heartrateDays = [];
  for (let i = 0; i < days.length; i++) {
    let caloriesRawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public', `/data/ex1/${participant}/calories-${days[i]}.json`)));

    allData = [];
    for (let i = 0; i < names.length - 1; i++) {
      allData.push([]);
    }
    caloriesRawData.forEach(e => {
      for (let i = 0; i < names.length - 1; i++) {
        if (e[names[i + 1]] !== null) {
          allData[i].push(parseFloat(e[names[i + 1]]));
        } else {
          allData[i].push(0)
        }
      }
    });
    caloriesDays.push(pcorr(allData));
  }

  for (let i = 0; i < days.length; i++) {
    let stepsRawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public', `/data/ex1/${participant}/steps-${days[i]}.json`)));

    allData = [];
    for (let i = 0; i < names.length - 1; i++) {
      allData.push([]);
    }
    stepsRawData.forEach(e => {
      for (let i = 0; i < names.length - 1; i++) {
        if (e[names[i + 1]] !== null) {
          allData[i].push(parseFloat(e[names[i + 1]]));
        } else {
          allData[i].push(0)
        }
      }
    });
    stepsDays.push(pcorr(allData));
  }

  for (let i = 0; i < days.length; i++) {
    let distanceRawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public', `/data/ex1/${participant}/distance-${days[i]}.json`)));
    allData = [];
    for (let i = 0; i < names.length - 1; i++) {
      allData.push([]);
    }

    distanceRawData.forEach(e => {
      for (let i = 0; i < names.length - 1; i++) {
        if (e[names[i + 1]] != null) {
          allData[i].push(parseFloat(e[names[i + 1]]));
        } else {
          allData[i].push(0)
        }
      }
    });
    distanceDays.push(pcorr(allData));
  }

  for (let d = 0; d < days.length; d++) {
    let heartrateRawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public', `/data/ex1/${participant}/heartrate-${days[d]}.json`)));

    allData = [];
    for (let i = 0; i < names.length - 3; i++) {
      allData.push([]);
    }
    heartrateRawData.forEach(e => {
      for (let i = 0; i < names.length - 3; i++) {
        if (e[names[i + 1]] != null) {
          allData[i].push(parseFloat(e[names[i + 1]]));
        } else {
          allData[i].push(0)
        }
      }
    });
    heartrateDays.push(pcorr(allData));
  }
  res.render('index', {
    matrix: JSON.stringify(caloriesDays),
    matrixSteps: JSON.stringify(stepsDays),
    matrixDistance: JSON.stringify(distanceDays),
    matrixHeartrate: JSON.stringify(heartrateDays),
    names: JSON.stringify(names),
    participantsCount: 10,
    participants: participants,
    participant: participant,
    title: "First Experiment",
    removeZeros: removeZeros,
    types: ['calories', 'heartrate', 'steps', 'distance']
  });
});
function getData(participant, inputNames, type) {
  let rawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public', `/data/ex2/${participant}/tm-${type}.json`)));
  data = [];
  for (let i = 0; i < inputNames.length - 1; i++) {
    data.push([]);
  }
  rawData.forEach(e => {
    for (let i = 0; i < inputNames.length - 1; i++) {
      if (e[inputNames[i + 1]] !== null) {
        data[i].push(parseFloat(e[inputNames[i + 1]]));
      } else {
        data[i].push(0);
      }
    }
  });
  return data;
}

router.get('/second', (req, res, next) => {
  var participant = req.query.p || "p1";
  var removeZeros = req.query.z;
  var names = ['Time Count(Every 60 seconds)', 'GT', 'Fitbit One', 'Fitbit Flex 2', 'Fitbit Surge', 'Fitbit Charge HR', 'Fitbit Charge 2'];
  var heartRateSensors = ['Time Count(Every 60 seconds)', "GT", "Fitbit Charge HR", "Fitbit Charge 2", "Fitbit Surge"]

  caloriesData = getData(participant, names, "calories2");
  stepsData = getData(participant, names, "steps2");
  hrData = getData(participant, heartRateSensors, "heartrate");
  res.render('second', {
    names: JSON.stringify(['Time Count(Every 60 seconds)', 'GT', 'Fitbit One', 'Fitbit Flex 2', 'Fitbit Surge',
      'Fitbit Charge HR', 'Fitbit Charge 2'
    ]),
    matrix: JSON.stringify(pcorr(caloriesData)),
    matrix2: JSON.stringify(pcorr(stepsData)),
    matrix3: JSON.stringify(pcorr(hrData)),
    participantsCount: 20,
    participants: participants,
    participant: participant,
    title: "Second Experiment",
    removeZeros: removeZeros,
    types: ['calories', 'calories2', 'heartrate', 'steps', 'steps2'],
    titles: ['Energy Consumption in Calories (Cumulative)', 'Energy Consumption in Calories (Discrete)', 'Heart Rate', 'Steps (Cumulative)', 'Steps (Discrete)']
  });
});

router.get('/download', function (req, res) {
  var participant = req.query.p;
  var experiment = req.query.e;
  var type = req.query.type;
  var file = 'public/images/favicon.ico';
  // res.download(file); 
  if (experiment === "2") {
    file = 'public/dataOriginal/sample' + participant.substr(1) + '_treadmillData.xlsx';
  } else if (experiment === "1") {
    file = 'public/dataOriginal/sample' + participant.substr(1) + '_oneWeekData/' + type + ".xlsx";
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