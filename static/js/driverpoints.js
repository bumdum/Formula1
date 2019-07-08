var salesData;
var runningData;
var runningColors;

$(document).ready(function () {
    Plot();
});
function Plot() {
    TransformChartData(chartData, chartOptions);
    BuildBar("chart", chartData, chartOptions);
}
function BuildBar(id, chartData, options, level) {
    chart = d3.select("#" + id + " .innerCont");
    var margin = { top: 50, right: 10, bottom: 30, left: 50 },
    width = $(chart[0]).outerWidth() - margin.left - margin.right,
    height = $(chart[0]).outerHeight() - margin.top - margin.bottom
    var xVarName;
    var yVarName = options[0].yaxis;
    xVarName = options[0].xaxis;
    var xAry = runningData.map(function (el) {
        return el[xVarName];
    });
    var yAry = runningData.map(function (el) {
        return el[yVarName];
    });
    var capAry = runningData.map(function (el) { return el.caption; });
    var x = d3.scale.ordinal().domain(xAry).rangeRoundBands([0, width], .5);
    var y = d3.scale.linear().domain([0, d3.max(runningData, function (d) { return d[yVarName]; })]).range([height, 0]);
    var rcolor = d3.scale.ordinal().range(runningColors);
    chart = chart
        .append("svg")  //append svg element inside #chart
        .attr("width", width + margin.left + margin.right)    //set width
        .attr("height", height + margin.top + margin.bottom);  //set height
    var bar = chart.selectAll("g")
            .data(runningData)
            .enter()
            .append("g")
            .attr("transform", function (d) {
                return "translate(" + x(d[xVarName]) + ", 0)";
            });
    var ctrtxt = 0;
    var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom").ticks(xAry.length)
                .tickFormat(function (d) {
                    var mapper = options[0].captions[0]
                    return mapper[d]
                });
    var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left").ticks(5); //orient left because y-axis tick labels will appear on the left side of the axis.
    bar.append("rect")
        .attr("y", function (d) {
            return y(d.Total) + margin.top - 15;
        })
        .attr("x", function (d) {
            return (margin.left);
        })
    bar.selectAll("rect").attr("height", function (d) {
        return height - y(d[yVarName]);
    })
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000)
        .attr("width", x.rangeBand()) //set width base on range on ordinal data
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000);
    bar.selectAll("rect").style("fill", function (d) {
        return rcolor(d[xVarName]);
    })
    bar.append("text")
    .attr("x", x.rangeBand() / 2 + margin.left - 10)
    .attr("y", function (d) { return y(d[yVarName]) + margin.top - 25; })
    .attr("dy", ".35em")
    .text(function (d) {
        return d[yVarName];
    });
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top - 15) + ")")
        .call(xAxis)
    .append("text")
        .attr("x", width)
        .attr("y", -6)
    .style("text-anchor", "end")
    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin.left + "," + (margin.top - 15) + ")")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

}
function TransformChartData(chartData, opts, level, filter) {
    var result = [];
    var resultColors = [];
    var counter = 0;
    var hasMatch;
    var xVarName;
    var yVarName = opts[0].yaxis;
    xVarName = opts[0].xaxis;
    for (var i in chartData) {
        hasMatch = false;
        for (var index = 0; index < result.length; ++index) {
            var data = result[index];
            if (data[xVarName] == chartData[i][xVarName]) {
                result[index][yVarName] = result[index][yVarName] + chartData[i][yVarName];
                hasMatch = true;
                break;
            }
        }
        if (hasMatch == false) {
            ditem = {};
            ditem[xVarName] = chartData[i][xVarName];
            ditem[yVarName] = chartData[i][yVarName];
            ditem["caption"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
            ditem["title"] = opts[0].captions != undefined ? opts[0].captions[0][chartData[i][xVarName]] : "";
            ditem["op"] = 1;
            result.push(ditem);
            resultColors[counter] = opts[0].color != undefined ? opts[0].color[0][chartData[i][xVarName]] : "";
            counter += 1;
        }
    }
    runningData = result;
    runningColors = resultColors;
    return;
}
var chartData = [
    {
        "Country": "USA",
        "Model": "Model 1",
        "Total": 487
    },
    {
        "Country": "USA",
        "Model": "Model 2",
        "Total": 185
    },
    {
        "Country": "USA",
        "Model": "Model 3",
        "Total": 140
    },
    {
        "Country": "USA",
        "Model": "Model 4",
        "Total": 108
    },
    {
        "Country": "USA",
        "Model": "Model 5",
        "Total": 26
    },
    {
        "Country": "USA",
        "Model": "Model 6",
        "Total": 106
    },
    {
        "Country": "USA",
        "Model": "Model 7",
        "Total": 27
    },
    {
        "Country": "USA",
        "Model": "Model 8",
        "Total": 44
    },
    {
        "Country": "USA",
        "Model": "Model 9",
        "Total": 96
    },
    {
        "Country": "INDIA",
        "Model": "Model 1",
        "Total": 411
    },
    {
        "Country": "INDIA",
        "Model": "Model 2",
        "Total": 33
    },
    {
        "Country": "INDIA",
        "Model": "Model 3",
        "Total": 32
    },
    {
        "Country": "INDIA",
        "Model": "Model 4",
        "Total": 29
    },
    {
        "Country": "INDIA",
        "Model": "Model 5",
        "Total": 29
    },
    {
        "Country": "CANADA",
        "Model": "Model 1",
        "Total": 7
    },
    {
        "Country": "CANADA",
        "Model": "Model 2",
        "Total": 20
    },
    {
        "Country": "CANADA",
        "Model": "Model 3",
        "Total": 232
    },
    {
        "Country": "CANADA",
        "Model": "Model 4",
        "Total": 1117
    }
];
chartOptions = [{
    "captions": [{ "INDIA": "INDIA", "CANADA": "CANADA", "USA": "USA" }],
    "color": [{ "INDIA": "#FFA500", "CANADA": "#0070C0", "USA": "#ff0000" }],
    "xaxis": "Country",
    "yaxis": "Total"
}]