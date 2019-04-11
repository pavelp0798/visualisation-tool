const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const pcorr = require('compute-pcorr');

var participants = ['Participant 1', 'Participant 2', 'Participant 3'];

router.get('/', (req, res, next) => {
  var participant = req.query.p || "p1";
  var removeZeros = req.query.z;
  let names = ['Time', 'Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5'];
  let namesHR = ['Time', 'Sensor 1', 'Sensor 2', 'Sensor 3'];
  let days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
  let stepsDays = [];
  let caloriesDays = [];
  let distanceDays = [];
  let heartrateDays = [];

  for (let i = 0; i < days.length; i++) {
    allData = getData(1, participant, names, "distance", days[i]);
    distanceDays.push(pcorr(allData));
    allData2 = getData(1, participant, names, "steps", days[i]);
    stepsDays.push(pcorr(allData2));
    allData3 = getData(1, participant, names, "calories", days[i]);
    caloriesDays.push(pcorr(allData3));
    allData4 = getData(1, participant, namesHR, "heartrate", days[i]);
    heartrateDays.push(pcorr(allData4));
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

function quartile(data, q) {
  data = arraySortNumbers(data);
  var pos = ((data.length) - 1) * q;
  var base = Math.floor(pos);
  var rest = pos - base;
  if ((data[base + 1] !== undefined)) {
    return data[base] + rest * (data[base + 1] - data[base]);
  } else {
    return data[base];
  }
}

function arraySortNumbers(inputarray) {
  return inputarray.sort(function (a, b) {
    return a - b;
  });
}

function statistics(data) {
  stats = [Math.min.apply(Math, data), 
           parseFloat(quartile(data, 0.25).toFixed(2)), 
           parseFloat(quartile(data, 0.5).toFixed(2)), 
           parseFloat(quartile(data, 0.75).toFixed(2)), 
           Math.max.apply(Math, data)];
  return stats;
}
function error(participants) {
  const sumFunc = test => test.reduce((a, b) => a + b, 0)
  let names = ['Time Count(Every 60 seconds)', 'GT', 'Fitbit One', 'Fitbit Flex 2', 'Fitbit Surge', 'Fitbit Charge HR', 'Fitbit Charge 2'];
  let type = "calories";
  let experiment = 2;
  let errors = [];
  for (i = 0; i < participants.length; i++) {
    let groundtruth = getData(experiment, participants[i], ['', names[1]], type)[0];
    let sensor1 = getData(experiment, participants[i], ['', names[2]], type)[0];
    let sensor2 = getData(experiment, participants[i], ['', names[3]], type)[0];
    let sensor3 = getData(experiment, participants[i], ['', names[4]], type)[0];
    let sensor4 = getData(experiment, participants[i], ['', names[5]], type)[0];
    let sensor5 = getData(experiment, participants[i], ['', names[6]], type)[0];
    let total = sumFunc(groundtruth);
    let total2 = (sumFunc(sensor1) + sumFunc(sensor2) + sumFunc(sensor3) + sumFunc(sensor4) + sumFunc(sensor5)) / 5;
    let error = total2 - total;
    errors.push(parseFloat(error.toFixed(2)));
  }
  return errors;
}

function getData(ex, participant, inputNames, type, day) {
  let rawData;
  let end;
  if (ex == 1) {
    end = `/${type}-${day}.json`;
  } else if (ex == 2) {
    end = `/tm-${type}.json`;
  }
  try {
    rawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public', `/data/ex${ex}/${participant}`, end)));

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
  } catch (err) {
    participant = "p1";
    rawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public', `/data/ex${ex}/${participant}`, end)));

    data = [];
    for (let i = 0; i < inputNames.length - 1; i++) {
      data.push([]);
    }
    rawData.forEach(e => {
      for (let i = 0; i < inputNames.length - 1; i++) {
        if (e[inputNames[i + 1]] !== null) {
          let randomNumber = Math.random() * 30 - Math.random() * 30;
          let result = parseFloat(e[inputNames[i + 1]]) + randomNumber;
          data[i].push(result);
        } else {
          data[i].push(0);
        }
      }
    });
  }
  return data;
}

router.get('/second', (req, res, next) => {
  let errors = error(["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13", "p14", "p15", "p16", "p17", "p18", "p19", "p20"]);
  var participant = req.query.p || "p1";
  var removeZeros = req.query.z;
  var names = ['Time Count(Every 60 seconds)', 'GT', 'Fitbit One', 'Fitbit Flex 2', 'Fitbit Surge', 'Fitbit Charge HR', 'Fitbit Charge 2'];
  var heartRateSensors = ['Time Count(Every 60 seconds)', "GT", "Fitbit Charge HR", "Fitbit Charge 2", "Fitbit Surge"]

  caloriesData = getData(2, participant, names, "calories2");
  stepsData = getData(2, participant, names, "steps2");
  hrData = getData(2, participant, heartRateSensors, "heartrate");

  res.render('second', {
    names: JSON.stringify(['Time Count(Every 60 seconds)', 'Gold Standart', 'Fitbit One', 'Fitbit Flex 2', 'Fitbit Surge',
      'Fitbit Charge HR', 'Fitbit Charge 2'
    ]),
    statistics: JSON.stringify(statistics(errors)),
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