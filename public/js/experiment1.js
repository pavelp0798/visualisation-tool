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
            func_name(data[v - 1]);
        }
    }, 100);
}

function getDataDay(i, type, callback) {
    $.getJSON(`/data/ex1/${participant}/${type}-day${i}.json`, function (jsonData) {
        let time = [];
        let s1 = [];
        let s2 = [];
        let s3 = [];
        let s4 = [];
        let s5 = [];
        let average = [];
        let sum = 0;
        let count = 0;
        jsonData.forEach(e => {
            for (w = 1; w < 6; w++) {
                if (parseInt(e[`Sensor ${w}`]) !== 0 && parseInt(e[`Sensor ${w}`]) != null) {
                    count++;
                    sum+=(parseInt(e[`Sensor ${w}`]) || 0);
                }
            }
        });
        console.log(sum, count);
        let averageInt = sum / count;
        count = 0;
        sum = 0;
        jsonData.forEach(e => {
            time.push(e['Time']);
            s1.push(parseInt(e['Sensor 1']));
            s2.push(parseInt(e['Sensor 2']));
            s3.push(parseInt(e['Sensor 3']));
            s4.push(parseInt(e['Sensor 4']));
            s5.push(parseInt(e['Sensor 5']));
            average.push(averageInt);
        });
        averageInt = 0;
        
        let all = [time, s1, s2, s3, s4, s5, average];
        
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