function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getData(type, callback) {
    const j = 7;
    let all = []
    for (let i = 1; i <= j; i++) {
        getDataDay(i, type, function (data) {
            all[i - 1] = data;
        });
    }
    setTimeout(function () {
        callback(all);
    }, 100);
}

function getDataDay(i, type, callback) {
    $.getJSON(`/data/${type}-day${i}.json`, function (jsonData) {
        let time = [];
        let s1 = [];
        let s2 = [];
        let s3 = [];
        let s4 = [];
        let s5 = [];
        jsonData.forEach(e => {
            time.push(e['Time']);
            s1.push(e['Sensor 1']);
            s2.push(e['Sensor 2']);
            s3.push(e['Sensor 3']);
            s4.push(e['Sensor 4']);
            s5.push(e['Sensor 5']);
        });
        let all = [time, s1, s2, s3, s4, s5];
        callback(all);
    });
}
let type = "steps";
getData(type, function (data) {
    displayGraph(type, data);
});
setTimeout(function(){
    type = "heartrate";
    getData(type, function (data) {
        displayGraph(type, data);
    });
}, 100);

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
                        }
                    ]
                });
            }
            func_name(data[v - 1]);
        }
    }, 100);
}