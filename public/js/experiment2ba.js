function capitalizeFirstLetter(string) {
    let uString = string.charAt(0).toUpperCase() + string.slice(1);
    let fString = uString.replace(/([a-zA-Z])(\d)/g, '$1 $2');
    return fString
}

function baDisplayGraph(type, data, names) {
    setTimeout(function () {
        const container = function (data) {
            

            // heartRateSensors = ["GT", "Fitbit Charge HR", "Fitbit Charge 2", "Fitbit Surge"]
            // for (i = 1; i < data.length; i++) {
            //     if (type == "heartrate") {
            //         let dataPlot = [];
            //         dataPlot.push((data[1][i] + data[2][i]) / 2);
            //         dataPlot.push(data[1][i] - data[2][i]);
            //         diffMeanPlot.push(dataPlot);
            //     }
            // }
            heartRateSensors = ["GT", "Fitbit Charge HR", "Fitbit Charge 2", "Fitbit Surge"]

            
            let dataPlot = [];
            let diffMeanPlot = [];
            for (i = 1; i < data.length; i++) {
                if (type == "heartrate") {
                    if (heartRateSensors.indexOf(names[i]) >= 0) {
                        dataPlot.push({
                            name: names[i],
                            data: data[i]
                        });
                    }
                }
            }
            let averageDiff = 0;
            let total = 0;
            let minMean = Number.MAX_SAFE_INTEGER;
            let maxMean = Number.MIN_SAFE_INTEGER;

            for (i = 0; i < dataPlot[0]["data"].length; i++) {
                let dataPlot2 = [];
                let meanValue = (dataPlot[0]["data"][i] + dataPlot[1]["data"][i]) / 2;
                let diff = dataPlot[0]["data"][i] - dataPlot[1]["data"][i]
                if (meanValue < minMean) minMean = meanValue;
                if (meanValue > maxMean) maxMean = meanValue;
                
                total += diff
                dataPlot2.push(meanValue);
                dataPlot2.push(diff);
                diffMeanPlot.push(dataPlot2);
            } 
            averageDiff = total / dataPlot[0]["data"].length
            let SDprep = 0
            for (i = 0; i < dataPlot[0]["data"].length; i++) {
                let diff = dataPlot[0]["data"][i] - dataPlot[1]["data"][i]
                SDprep += Math.pow((parseFloat(diff) - averageDiff),2);
            }
            let SDresult = Math.sqrt(SDprep/dataPlot[0]["data"].length);
            // for (i = 0; i < )
            const options = {
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: 'Bland Altman'
                },
                subtitle: {
                    text: 'Sheffield Hallam Lab'
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Mean'
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: 'Difference'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 80,
                    y: 0,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                    borderWidth: 1
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: '{point.x}, {point.y}'
                        }
                    }
                },
                series: [{
                    name: dataPlot[0]["name"] + " vs " + dataPlot[1]["name"],
                    color: 'rgba(223, 83, 83, .5)',
                    data: diffMeanPlot

                }, {
                    type: 'line',
                    name: 'Mean Line',
                    data: [[minMean, averageDiff], [maxMean, averageDiff]],
                    marker: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            lineWidth: 0
                        }
                    },
                    enableMouseTracking: true
                }, {
                    type: 'line',
                    name: 'SD Line',
                    data: [[minMean, averageDiff + SDresult * 1.96], [maxMean, averageDiff + SDresult * 1.96]],
                    marker: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            lineWidth: 0
                        }
                    },
                    enableMouseTracking: true
                }, {
                    type: 'line',
                    name: 'SD Line 2',
                    data: [[minMean, averageDiff - SDresult * 1.96], [maxMean, averageDiff - SDresult * 1.96]],
                    marker: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            lineWidth: 0
                        }
                    },
                    enableMouseTracking: true
                }]
            }
            Highcharts.chart("ba" + type, options);
        }
        container(data);
    }, 1000);

}

function getData(type, names, callback) {
    $.getJSON(`/data/ex2/${participant}/tm-${type}.json`, function (jsonData) {
        let allData = [];
        for (let i = 0; i < names.length; i++) {
            allData.push([]);
        }
        jsonData.forEach(e => {
            for (let i = 0; i < names.length; i++) {
                if (i === 0) {
                    allData[i].push(e[names[i]]);
                } else {
                    allData[i].push(parseInt(e[names[i]]));
                }
            }
        });

        setTimeout(function () {
            callback(allData);
        }, 100);
    });
}