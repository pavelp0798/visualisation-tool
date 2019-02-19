function getData(callback) {
    let all = []
    // setTimeout(function(){ console.log(data[7]) }, 3000);
    getDataDay(1, function(data) {
        all[0] = data;
    });
    getDataDay(2, function(data) {
        all[1] = data;
    });
    getDataDay(3, function(data) {
        all[2] = data;
    });
    getDataDay(4, function(data) {
        all[3] = data;
    });
    getDataDay(5, function(data) {
        all[4] = data;
    });
    getDataDay(6, function(data) {
        all[5] = data;
    });
    getDataDay(7, function(data) {
        all[6] = data;
    });
    
    
    callback(all);
}


function getDataDay(i, callback) {
    $.getJSON(`/data/steps-day${i}.json`, function (jsonData) {
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
getData(function (data) {
    setTimeout(function(){ 
    for (v = 1; v <= 7; v++) {
        var container = "heartrate-day" + v;
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
                    text: `Steps Day ${v}`
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
            // title: {
            //         text: `Heart Rate Day ${v}`
            //     },
            //     subtitle: {
            //         text: 'Source: Sheffield Hallam Lab'
            //     },
            //     xAxis: {
            //         categories: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
            //     },

            //     series: [{
            //         data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 3],
            //         pointStart: 1
            //     }]
        }
        
            func_name(data[v-1]);

    }
}, 500);
});
// for (v = 1; v < 7; v++) {
//     var container = "heartrate-day" + v;
//     var func_name = "container" + v;
//     func_name = function (data) {
//         let time = data[0];
//         let s1 = data[1];
//         let s2 = data[2];
//         let s3 = data[3];
//         let s4 = data[4];
//         let s5 = data[5];
//         Highcharts.chart(container, {
//             title: {
//                 text: `Steps Day ${v-1}`
//             },
//             subtitle: {
//                 text: 'Source: Sheffield Hallam Lab'
//             },
//             xAxis: {
//                 categories: time
//             },
//             yAxis: {
//                 title: {
//                     text: 'Steps'
//                 }
//             },
//             plotOptions: {
//                 line: {
//                     dataLabels: {
//                         enabled: false
//                     },
//                     enableMouseTracking: true
//                 }
//             },
//             series: [{
//                     name: 'Sensor 1',
//                     data: s1
//                 },
//                 {
//                     name: 'Sensor 2',
//                     data: s2
//                 },
//                 {
//                     name: 'Sensor 3',
//                     data: s3
//                 },
//                 {
//                     name: 'Sensor 4',
//                     data: s4
//                 },
//                 {
//                     name: 'Sensor 5',
//                     data: s5
//                 }
//             ]
//         });
//     }
//     // func_name(day);

//     // func_name = function (data) {
//     //     Highcharts.chart(container, {

//     //         title: {
//     //             text: 'Logarithmic axis demo'
//     //         },

//     //         xAxis: {
//     //             tickInterval: 1
//     //         },

//     //         yAxis: {
//     //             type: 'logarithmic',
//     //             minorTickInterval: 0.1
//     //         },


//     //         series: [{
//     //             data: data[1]
//     //         }]
//     //     });
//     // }
//     getData(v, function (data) {
//         func_name(data);
//     });
// }

// for (i = 1; i <= 1; i++) {
//     $.getJSON(`/data/steps-day${i}.json`, function (data) {
//         // console.log(i);

//         let time = [];
//         let s1 = [];
//         let s2 = [];
//         let s3 = [];
//         let s4 = [];
//         let s5 = [];
//         data.forEach(e => {
//             time.push(e['Time']);
//             s1.push(e['Sensor 1']);
//             s2.push(e['Sensor 2']);
//             s3.push(e['Sensor 3']);
//             s4.push(e['Sensor 4']);
//             s5.push(e['Sensor 5']);
//         });
//         console.log(i);

//         chart(time, s1, s2, s3, s4, s5, i);
//     });
// }
// function getData() {
//     var objects = [];
//     for (i = 1; i <= 7; i++) {
//         $.getJSON(`/data/steps-day${i}.json`, function (data) {
//             let time = [];
//             let s1 = [];
//             let s2 = [];
//             let s3 = [];
//             let s4 = [];
//             let s5 = [];
//             data.forEach(e => {
//                 time.push(e['Time']);
//                 s1.push(e['Sensor 1']);
//                 s2.push(e['Sensor 2']);
//                 s3.push(e['Sensor 3']);
//                 s4.push(e['Sensor 4']);
//                 s5.push(e['Sensor 5']);
//             });
//             let all = [time, s1, s2, s3, s4, s5];
//             objects.push(all);
//         });

//         console.log(test);
//     }
//     // console.log(objects);

//     return objects;
// }


// for (i = 1; i <= 7; i++) {
//     getData(i, function (data) {
//         console.log(data);
//     });
// }

// for (i = 1; i <= 7; i++) {
//     let data = getData();
//     // console.log(data);

//     var container = "heartrate-day" + i;
//     var func_name = "heartrate-day" + i;
//     var iteration = i;
//     let day = data[i - 1];
//     func_name = function chart(day) {
//         let time = day[0];
//         let s1 = day[1];
//         let s2 = day[2];
//         let s3 = day[3];
//         let s4 = day[4];
//         let s5 = day[5];
//         Highcharts.chart(container, {
//             title: {
//                 text: `Steps Day ${iteration}`
//             },
//             subtitle: {
//                 text: 'Source: Sheffield Hallam Lab'
//             },
//             xAxis: {
//                 categories: time
//             },
//             yAxis: {
//                 title: {
//                     text: 'Steps'
//                 }
//             },
//             plotOptions: {
//                 line: {
//                     dataLabels: {
//                         enabled: false
//                     },
//                     enableMouseTracking: true
//                 }
//             },
//             series: [{
//                     name: 'Sensor 1',
//                     data: s1
//                 },
//                 {
//                     name: 'Sensor 2',
//                     data: s2
//                 },
//                 {
//                     name: 'Sensor 3',
//                     data: s3
//                 },
//                 {
//                     name: 'Sensor 4',
//                     data: s4
//                 },
//                 {
//                     name: 'Sensor 5',
//                     data: s5
//                 }
//             ]
//         });
//     }
//     func_name(day);
// }

// $.getJSON("/data/heartrate-day1.json", callbackFuncWithData2);

// function callbackFuncWithData2(data) {
//     let time = [];
//     let s1 = [];
//     let s2 = [];
//     let s3 = [];
//     let s4 = [];
//     let s5 = [];
//     data.forEach(e => {
//         time.push(e['Time']);
//         s1.push(parseInt(e['Sensor 1']));
//         s2.push(e['Sensor 2']);
//         s3.push(e['Sensor 3']);
//         s4.push(e['Sensor 4']);
//         s5.push(e['Sensor 5']);
//     });
//     chart2(time, s1, s2, s3, s4, s5);
// }
// console.log(time);
// function chart2(time, s1, s2, s3, s4, s5) {
//     Highcharts.chart('heartrate-day2', {
//         title: {
//             text: 'Heart Rate Day 1'
//         },
//         subtitle: {
//             text: 'Source: Sheffield Hallam Lab'
//         },
//         xAxis: {
//             categories: time
//         },
//         yAxis: {
//             title: {
//                 text: 'Heart Rate'
//             }
//         },
//         plotOptions: {
//             line: {
//                 dataLabels: {
//                     enabled: false
//                 },
//                 enableMouseTracking: true
//             }
//         },
//         series: [{
//                 name: 'Sensor 1',
//                 data: s1
//             },
//             {
//                 name: 'Sensor 2',
//                 data: s2
//             },
//             {
//                 name: 'Sensor 3',
//                 data: s3
//             },
//             {
//                 name: 'Sensor 4',
//                 data: s4
//             },
//             {
//                 name: 'Sensor 5',
//                 data: s5
//             }
//         ]
//     });
// }














// Highcharts.chart('graph1', {

//     title: {
//         text: 'Solar Employment Growth by Sector, 2010-2016'
//     },

//     subtitle: {
//         text: 'Source: thesolarfoundation.com'
//     },

//     yAxis: {
//         title: {
//             text: 'Number of Employees'
//         }
//     },
//     legend: {
//         layout: 'vertical',
//         align: 'right',
//         verticalAlign: 'middle'
//     },

//     plotOptions: {
//         series: {
//             label: {
//                 connectorAllowed: false
//             },
//             pointStart: 2010
//         }
//     },

//     series: [{
//         name: 'Installation',
//         data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
//     }, {
//         name: 'Manufacturing',
//         data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
//     }, {
//         name: 'Sales & Distribution',
//         data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
//     }, {
//         name: 'Project Development',
//         data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
//     }, {
//         name: 'Other',
//         data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
//     }],

//     responsive: {
//         rules: [{
//             condition: {
//                 maxWidth: 600
//             },
//             chartOptions: {
//                 legend: {
//                     layout: 'horizontal',
//                     align: 'center',
//                     verticalAlign: 'bottom'
//                 }
//             }
//         }]
//     }

// });



// function getData(n) {
//     var arr = [],
//         i,
//         x,
//         a,
//         b,
//         c,
//         spike;
//     for (
//         i = 0, x = Date.UTC(new Date().getUTCFullYear(), 0, 1) - n * 36e5; i < n; i = i + 1, x = x + 36e5
//     ) {
//         if (i % 100 === 0) {
//             a = 2 * Math.random();
//         }
//         if (i % 1000 === 0) {
//             b = 2 * Math.random();
//         }
//         if (i % 10000 === 0) {
//             c = 2 * Math.random();
//         }
//         if (i % 50000 === 0) {
//             spike = 10;
//         } else {
//             spike = 0;
//         }
//         arr.push([
//             x,
//             2 * Math.sin(i / 100) + a + b + c + spike + Math.random()
//         ]);
//     }
//     return arr;
// }


// var n = 5000,
//     data = getData(n);

// Highcharts.chart('graph2', {

//     chart: {
//         zoomType: 'x'
//     },

//     title: {
//         text: 'Highcharts drawing ' + n + ' points'
//     },

//     subtitle: {
//         text: 'Using the Boost module'
//     },

//     tooltip: {
//         valueDecimals: 2
//     },

//     xAxis: {
//         type: 'datetime'
//     },

//     series: [{
//         data: data,
//         lineWidth: 0.5,
//         name: 'Hourly data points'
//     }]

// });