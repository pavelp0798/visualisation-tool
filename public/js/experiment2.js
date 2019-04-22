function capitalizeFirstLetter(string) {
    let uString = string.charAt(0).toUpperCase() + string.slice(1);
    let fString = uString.replace(/([a-zA-Z])(\d)/g, '$1 $2');
    return fString
}

function displayGraph(type, data, names, title) {
    setTimeout(function () {
        const container = function (data) {
            let time = data[0];
            let input = [];
            heartRateSensors = ["Gold Standard", "Fitbit Charge HR", "Fitbit Charge 2", "Fitbit Surge"]
            for (i = 1; i < data.length; i++) {
                if (type == "heartrate") {
                    if (heartRateSensors.indexOf(names[i]) >= 0) {
                        input.push({
                            name: names[i],
                            data: data[i]
                        });
                    }
                } else {
                    input.push({
                        name: names[i],
                        data: data[i]
                    });
                }
            }
            const options = {
                // chart: {
                //     type: 'area'
                // },
                title: {
                    text: `${title}`
                },
                subtitle: {
                    text: 'Source: Sheffield Hallam Lab | Gender: Male'
                },
                
                xAxis: {
                    categories: time,
                    title: {
                        text: names[0]
                    }
                },
                yAxis: {
                    title: {
                        text: `${capitalizeFirstLetter(type)}`
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: false
                        },
                        enableMouseTracking: true
                    }
                },
                series: input
            }
            Highcharts.chart(type, options);
        }
        container(data);
    }, 100);
}

function getDistanceData(callback) {
    let dataTypes = ["Name", "Start", "End", "Distance(M)", "Diff"];
    $.getJSON(`/data/ex2/${participant}/tm-distance.json`, function(jsonData) {
        let allData = [];
        for (let i = 0; i < names.length; i++) {
            allData.push([]);
        }
        jsonData.forEach(e => {
            for (let i = 0; i < 5; i++) {
                if (i == 0) {
                    allData[i].push(e[dataTypes[i]]);
                } else {
                    allData[i].push(parseInt(e[dataTypes[i]]));
                }
            }
        });
        setTimeout(function () {
            callback(allData);
        }, 100);
    });
}

function getData(type, names, callback) {
    $.getJSON(`/data/ex2/${participant}/tm-${type}.json`, function (jsonData) {
        let allData = [];
        for (let i = 0; i < names.length; i++) {
            allData.push([]);
        }
        jsonData.forEach(e => {
            for (let i = 0; i < names.length; i++) {
                let currentName = names[i];
                if (names[i] == "Gold Standard") {
                    currentName = "GT";
                }
                if (i === 0) {
                    allData[i].push(e[currentName]);
                } else {
                    allData[i].push(parseInt(e[currentName]));
                }
            }
        });

        setTimeout(function () {
            callback(allData);
        }, 100);
    });
}