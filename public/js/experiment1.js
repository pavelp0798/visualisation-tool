function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayGraph(type, data) {
    setTimeout(function () {
        for (let v = 1; v <= 7; v++) {
            var container = type + "-day" + v;
            var func_name = "container" + v;
            func_name = function (data) {
                let time = data[0];
                let input = [];
                let names = ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5', 'Average', 'Comulative'];

                for (let i = 1; i < data.length; i++) {
                    let vis = true;
                    if (i === 7) {
                        vis = false;
                    }
                    if (data[i].length !== 0) {
                        input.push({
                            data: data[i],
                            name: names[i - 1],
                            visible: vis,
                        });
                    }

                }
                const options = {
                    title: {
                        text: `${capitalizeFirstLetter(type)} Day ${v}`
                    },
                    subtitle: {
                        text: 'Source: Sheffield Hallam Lab'
                    },
                    xAxis: {
                        categories: time
                    },
                    yAxis: {
                        title: {
                            text: `${type}`
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
                Highcharts.chart(container, options);
            }
            func_name(data[v - 1]);
        }
    }, 100);
}

function getDataDay(i, type, removeZeros, callback) {
    $.getJSON(`/data/ex1/${participant}/${type}-day${i}.json`, function (jsonData) {
        let time = [],
            s1 = [],
            s2 = [],
            s3 = [],
            s4 = [],
            s5 = [],
            c = [],
            average = [];
        let sum = 0,
            count = 0,
            commulative = 0;
            
        jsonData.forEach(e => {
            for (w = 1; w < 6; w++) {
                if (parseFloat(e[`Sensor ${w}`]) !== 0 && parseFloat(e[`Sensor ${w}`]) != null) {
                    count++;
                    sum += (parseFloat(e[`Sensor ${w}`]) || 0);
                }
            }
        });
        let averageInt = sum / count;
        count = 0;
        sum = 0;
        let allData = []
        for (let i = 0; i < 8; i++) {
            allData.push([]);
        }
        jsonData.forEach(function (item, index) {
            if (type === "heartrate") {
                allData[0].push(jsonData[index]['Time']);
                for (let i = 1; i < 6; i++) {
                    if ((parseInt(jsonData[index][`Sensor ${i}`]) === 0) && (removeZeros === '1')) {
                        if ((index > 0) && (index < jsonData.length-1)) {
                            var average = (parseInt(jsonData[index-1][`Sensor ${i}`]) + parseInt(jsonData[index+1][`Sensor ${i}`]))/2
                            allData[i].push(average);
                        } else {
                            allData[i].push(parseInt(jsonData[index][`Sensor ${i}`]));
                        }
                    } else {
                        allData[i].push(parseInt(jsonData[index][`Sensor ${i}`]));
                    }
                }
            } else if (type === "distance") {
                allData[0].push(item['Time']);
                for (let i = 1; i < 6; i++) {
                    allData[i].push(item[`Sensor ${i}`]);
                }
                commulative += ((item['Sensor 1'] + item['Sensor 2'] + item['Sensor 3'] + item['Sensor 4'] + item['Sensor 5']) / 5)
                allData[7].push(commulative);
            } else {
                allData[0].push(item['Time']);
                for (let i = 1; i < 6; i++) {
                    allData[i].push(item[`Sensor ${i}`]);
                }
            }
            allData[6].push(averageInt);
        });
        averageInt = 0;
        commulative = 0;
        callback(allData);
    });
}

function getData(type, removeZeros, callback) {
    const j = 7;
    let all = []
    for (let i = 1; i <= j; i++) {
        getDataDay(i, type, removeZeros, function (data) {
            all[i - 1] = data;
        });
    }
    setTimeout(function () {
        callback(all);
    }, 100);
}