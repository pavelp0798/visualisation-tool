$.getJSON("/data/steps-day1.json", callbackFuncWithData);
function callbackFuncWithData(data) {
    let time = [];
    let p1 = [];
    let p2 = [];
    let p3 = [];
    let p4 = [];
    let p5 = [];
    data.forEach(e => {
        time.push(e['Time']);
        p1.push(e['Participant 1']);
        p2.push(e['Participant 2']);
        p3.push(e['Participant 3']);
        p4.push(e['Participant 4']);
        p5.push(e['Participant 5']);
    });
    chart1(time, p1, p2, p3, p4, p5);
}
$.getJSON("/data/heartrate-day1.json", callbackFuncWithData2);
function callbackFuncWithData2(data) {
    let time = [];
    let p1 = [];
    let p2 = [];
    let p3 = [];
    let p4 = [];
    let p5 = [];
    data.forEach(e => {
        time.push(e['Time']);
        p1.push(parseInt(e['Participant 1']));
        p2.push(e['Participant 2']);
        p3.push(e['Participant 3']);
        p4.push(e['Participant 4']);
        p5.push(e['Participant 5']);
    });
    chart2(time, p1, p2, p3, p4, p5);
}
// console.log(time);
function chart1(time, p1, p2, p3, p4, p5) {
    Highcharts.chart('highchart-with-data-labels', {
        title: {
            text: 'Steps Day 1'
        },
        subtitle: {
            text: 'Source: Sheffield Hallam Lab'
        },
        xAxis: {
            categories: time
        },
        yAxis: {
            title: {
                text: 'Steps'
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
            name: 'Participant 1',
            data: p1
        },
        {
            name: 'Participant 2',
            data: p2
        },
        {
            name: 'Participant 3',
            data: p3
        },
        {
            name: 'Participant 4',
            data: p4
        },
        {
            name: 'Participant 5',
            data: p5
        }]
    });
}
function chart2(time, p1, p2, p3, p4, p5) {
    Highcharts.chart('highchart-with-data-labels2', {
        title: {
            text: 'Heart Rate Day 1'
        },
        subtitle: {
            text: 'Source: Sheffield Hallam Lab'
        },
        xAxis: {
            categories: time
        },
        yAxis: {
            title: {
                text: 'Heart Rate'
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
            name: 'Participant 1',
            data: p1
        },
        {
            name: 'Participant 2',
            data: p2
        },
        {
            name: 'Participant 3',
            data: p3
        },
        {
            name: 'Participant 4',
            data: p4
        },
        {
            name: 'Participant 5',
            data: p5
        }]
    });
}
Highcharts.chart('graph1', {

    title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
    },

    subtitle: {
        text: 'Source: thesolarfoundation.com'
    },

    yAxis: {
        title: {
            text: 'Number of Employees'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 600
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});



function getData(n) {
    var arr = [],
        i,
        x,
        a,
        b,
        c,
        spike;
    for (
        i = 0, x = Date.UTC(new Date().getUTCFullYear(), 0, 1) - n * 36e5;
        i < n;
        i = i + 1, x = x + 36e5
    ) {
        if (i % 100 === 0) {
            a = 2 * Math.random();
        }
        if (i % 1000 === 0) {
            b = 2 * Math.random();
        }
        if (i % 10000 === 0) {
            c = 2 * Math.random();
        }
        if (i % 50000 === 0) {
            spike = 10;
        } else {
            spike = 0;
        }
        arr.push([
            x,
            2 * Math.sin(i / 100) + a + b + c + spike + Math.random()
        ]);
    }
    return arr;
}


var n = 5000,
    data = getData(n);

Highcharts.chart('graph2', {

    chart: {
        zoomType: 'x'
    },

    title: {
        text: 'Highcharts drawing ' + n + ' points'
    },

    subtitle: {
        text: 'Using the Boost module'
    },

    tooltip: {
        valueDecimals: 2
    },

    xAxis: {
        type: 'datetime'
    },

    series: [{
        data: data,
        lineWidth: 0.5,
        name: 'Hourly data points'
    }]

});

