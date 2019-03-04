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
                let s1 = data[1];
                let s2 = data[2];
                let s3 = data[3];
                let s4 = data[4];
                let s5 = data[5];
                let average = data[6];
                if (data[7].length != 0) {
                    let c = data[7];
                    Highcharts.chart(container, {
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
                        series: [{
                                name: 'Sensor 1',
                                data: s1
                            },
                            {
                                name: 'Sensor 2',
                                data: s2
                            },
                            {
                                name: 'Sensor 3',
                                data: s3
                            },
                            {
                                name: 'Sensor 4',
                                data: s4
                            },
                            {
                                name: 'Sensor 5',
                                data: s5
                            },
                            {
                                name: 'Average',
                                data: average
                            },
                            {
                                visible: false,
                                name: 'Comulative',
                                data: c
                            }
                        ]
                    });
                } else {
                    Highcharts.chart(container, {
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
                        series: [{
                                name: 'Sensor 1',
                                data: s1
                            },
                            {
                                name: 'Sensor 2',
                                data: s2
                            },
                            {
                                name: 'Sensor 3',
                                data: s3
                            },
                            {
                                name: 'Sensor 4',
                                data: s4
                            },
                            {
                                name: 'Sensor 5',
                                data: s5
                            },
                            {
                                name: 'Average',
                                data: average
                            }
                        ]
                    });
                }
            }
            func_name(data[v - 1]);
        }
    }, 100);
}

function getDataDay(i, type, callback) {
    $.getJSON(`/data/ex1/${participant}/${type}-day${i}.json`, function (jsonData) {
        let time = [], s1 = [], s2 = [], s3 = [], s4 = [], s5 = [], c = [], average = [];
        let sum = 0, count = 0, commulative = 0;
        jsonData.forEach(e => {
            for (w = 1; w < 6; w++) {
                if (parseFloat(e[`Sensor ${w}`]) !== 0 && parseFloat(e[`Sensor ${w}`]) != null) {
                    count++;
                    sum+=(parseFloat(e[`Sensor ${w}`]) || 0);
                }
            }
        });
        let averageInt = sum / count;
        count = 0;
        sum = 0;
        jsonData.forEach(function(item, index) {
            if (type === "heartrate") {
                time.push(jsonData[index]['Time']);
                if (parseInt(jsonData[index]['Sensor 1']) == 0) {
                    s1.push(averageInt);
                } else {
                    s1.push(parseInt(jsonData[index]['Sensor 1']));
                }
                if (parseInt(jsonData[index]['Sensor 2']) == 0) {
                    s2.push(averageInt);
                } else {
                    s2.push(parseInt(jsonData[index]['Sensor 2']));
                }
                if (parseInt(jsonData[index]['Sensor 3']) == 0) {
                    s3.push(averageInt);
                } else {
                    s3.push(parseInt(jsonData[index]['Sensor 3']));
                }
                if (parseInt(jsonData[index]['Sensor 4']) == 0) {
                    s4.push(averageInt);
                } else {
                    s4.push(parseInt(jsonData[index]['Sensor 4']));
                }
                if (parseInt(jsonData[index]['Sensor 5']) == 0) {
                    s5.push(averageInt);
                } else {
                    s5.push(parseInt(jsonData[index]['Sensor 5']));
                }
            } else if (type === "distance") {
                time.push(item['Time']);
                s1.push(item['Sensor 1']);
                s2.push(item['Sensor 2']);
                s3.push(item['Sensor 3']);
                s4.push(item['Sensor 4']);
                s5.push(item['Sensor 5']);
                commulative += ((item['Sensor 1'] + item['Sensor 2'] + item['Sensor 3'] + item['Sensor 4'] + item['Sensor 5'])/5)
                c.push(commulative);
            } else {
                time.push(item['Time']);
                s1.push(parseInt(item['Sensor 1']));
                s2.push(parseInt(item['Sensor 2']));
                s3.push(parseInt(item['Sensor 3']));
                s4.push(parseInt(item['Sensor 4']));
                s5.push(parseInt(item['Sensor 5']));
            }
            average.push(averageInt);
        });
        averageInt = 0;
        let all = [time, s1, s2, s3, s4, s5, average, c];
        commulative = 0;
        callback(all);
    });
}
function getData(type, callback) {
    const j = 7;
    let all = []
    for (let i = 1; i <= j; i++) {
        getDataDay(i, type, function (data) {
            all[i-1] = data;
        });
    }
    setTimeout(function () {
        callback(all);
    }, 100);
}