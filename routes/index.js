const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const pcorr = require('compute-pcorr');
const loadJsonFile = require('load-json-file');

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

function getData2(type, names) {
  allData = [];
  loadJsonFile(path.join(__dirname, '../public', `/data/ex2/p2/tm-heartrate.json`)).then(json => {
    for (let i = 0; i < names.length; i++) {
      allData.push([]);
    }
    json.forEach(e => {
      for (let i = 0; i < names.length; i++) {
        if (i === 0) {
          allData[i].push(e[names[i]]);
        } else {
          allData[i].push(parseInt(e[names[i]]));
        }
      }
    });
    return allData;
  }).then(function (allData) {
    return allData;

  });
  // console.log(allData);
  // return allData;
  // getJSON(`/data/ex2/p2/tm-${type}.json`)
  //   .then(function (jsonData) {
  //     // let allData = [];
  //     // for (let i = 0; i < names.length; i++) {
  //     //   allData.push([]);
  //     // }
  //     // jsonData.forEach(e => {
  //     //   for (let i = 0; i < names.length; i++) {
  //     //     if (i === 0) {
  //     //       allData[i].push(e[names[i]]);
  //     //     } else {
  //     //       allData[i].push(parseInt(e[names[i]]));
  //     //     }
  //     //   }
  //     // });
  //     console.log(jsonData);
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
}

router.get('/second', (req, res, next) => {
  var participant = req.query.p || "p1";
  var removeZeros = req.query.z;
  var names = ['Time Count(Every 60 seconds)', 'GT', 'Fitbit One', 'Fitbit Flex 2', 'Fitbit Surge', 'Fitbit Charge HR', 'Fitbit Charge 2'];

  let caloriesRawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public', `/data/ex2/${participant}/tm-calories2.json`)));
  allData = [];
  for (let i = 0; i < names.length - 1; i++) {
    allData.push([]);
  }
  caloriesRawData.forEach(e => {
    for (let i = 0; i < names.length - 1; i++) {
      if (e[names[i + 1]] !== null) {
        allData[i].push(parseInt(e[names[i + 1]]));
      } else {
        allData[i].push(0)
      }
    }
  });
  let stepsRawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public', `/data/ex2/${participant}/tm-steps2.json`)));
  allData2 = [];
  for (let i = 0; i < names.length - 1; i++) {
    allData2.push([]);
  }
  stepsRawData.forEach(e => {
    for (let i = 0; i < names.length - 1; i++) {
      if (e[names[i + 1]] !== null) {
        allData2[i].push(parseInt(e[names[i + 1]]));
      } else {
        allData2[i].push(0)
      }
    }
  });

  let heartrateRawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public', `/data/ex2/${participant}/tm-heartrate.json`)));
  heartRateSensors = ["GT", "Fitbit Charge HR", "Fitbit Charge 2", "Fitbit Surge"]
  allData3 = [];
  for (let i = 0; i < heartRateSensors.length - 1; i++) {
    allData3.push([]);
  }
  heartrateRawData.forEach(e => {
    for (let i = 1; i < 4; i++) {
        if (e[heartRateSensors[i-1]] !== null) {
          allData3[i-1].push(parseInt(e[heartRateSensors[i-1]]));
        } else {
          allData3[i-1].push(0)
      }
    }
  });
  console.log(allData3);
  res.render('second', {
    names: JSON.stringify(['Time Count(Every 60 seconds)', 'GT', 'Fitbit One', 'Fitbit Flex 2', 'Fitbit Surge',
      'Fitbit Charge HR', 'Fitbit Charge 2'
    ]),
    matrix: JSON.stringify(pcorr(allData)),
    matrix2: JSON.stringify(pcorr(allData2)),
    matrix3: JSON.stringify(pcorr(allData3)),
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