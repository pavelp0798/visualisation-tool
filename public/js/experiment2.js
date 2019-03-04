function capitalizeFirstLetter(string) {
    let uString = string.charAt(0).toUpperCase() + string.slice(1);
    let fString = uString.replace(/([a-zA-Z])(\d)/g, '$1 $2');    
    return fString
}

function displayGraph(type, data, names) {
    setTimeout(function () {
        var container = function (data) {
            let time = data[0];
            let input = [];
            for (i = 1; i < data.length; i++) {
                input.push({
                    name: names[i],
                    data: data[i]
                });
            }
            Highcharts.chart(type, {
                title: {
                    text: `${capitalizeFirstLetter(type)} Day`
                },
                subtitle: {
                    text: 'Source: Sheffield Hallam Lab'
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
            });
        }
        container(data);
    }, 100);
}

function getData(type, names, callback) {
    $.getJSON(`/data/ex2/${participant}/tm-${type}.json`, function (jsonData) {
        let allData = [];

        for (var i = 0; i < names.length; i++) {
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
        console.log(allData);
        
        setTimeout(function () {
            callback(allData);
        }, 100);
    });
}