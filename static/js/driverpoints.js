var salesData;
var runningData;

var color = d3.scale.linear()
    .range(["hsl(-180,60%,50%)", "hsl(180,60%,50%)"])
    .interpolate(function(a, b) { var i = d3.interpolateString(a, b); return function(t) { return d3.hsl(i(t)); }; });

$(document).ready(function () {
    Plot();
});
function Plot() {
    TransformChartData(driverPoints);
    BuildBar("chart", driverPoints);
}
function BuildBar(id, driverPoints, level) {
    chart = d3.select("#" + id + " .innerCont");
    var margin = { top: 50, right: 10, bottom: 30, left: 50 },
    width = $(chart[0]).outerWidth() - margin.left - margin.right,
    height = $(chart[0]).outerHeight() - margin.top - margin.bottom
    var xVarName;
    var yVarName = 'p';
    xVarName = 'd';
    var xAry = runningData.map(function (el) {
        return el[xVarName];
    });
    var yAry = runningData.map(function (el) {
        return el[yVarName];
    });
    var capAry = runningData.map(function (el) { return el.caption; });
    var x = d3.scale.ordinal().domain(xAry).rangeRoundBands([0, width], .5);
    var y = d3.scale.linear().domain([0, d3.max(runningData, function (d) { return d[yVarName]; })]).range([height, 0]);
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
                    return d
                });
    var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left").ticks(5); //orient left because y-axis tick labels will appear on the left side of the axis.
    bar.append("rect")
        .attr("y", function (d) {
            return y(d.p) + margin.top - 15;
        })
        .attr("x", function (d) {
            return (margin.left);
        })
        .attr("width", 50)
    bar.selectAll("rect").attr("height", function (d) {
        return height - y(d[yVarName]);
    })
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000)
        .attr("width", x.rangeBand()) //set width base on range on ordinal data
        .transition().delay(function (d, i) { return i * 300; })
        .duration(1000);
    bar.selectAll("rect").style("fill", function (d) {
        return color(Math.random());
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
function TransformChartData(driverPoints, opts, level, filter) {
    var result = [];
    var resultColors = [];
    var counter = 0;
    var hasMatch;
    var xVarName;
    var yVarName = 'p';
    xVarName = 'd';
    for (var i in driverPoints) {
        hasMatch = false;
        for (var index = 0; index < result.length; ++index) {
            var data = result[index];
            if (data[xVarName] == driverPoints[i][xVarName]) {
                result[index][yVarName] = result[index][yVarName] + driverPoints[i][yVarName];
                hasMatch = true;
                break;
            }
        }
        if (hasMatch == false) {
            ditem = {};
            ditem[xVarName] = driverPoints[i][xVarName];
            ditem[yVarName] = driverPoints[i][yVarName];
            ditem["caption"] = driverPoints[i][xVarName];
            ditem["title"] = driverPoints[i][xVarName];
            ditem["op"] = 1;
            result.push(ditem);
            //console.log(JSON.stringify(ditem));
            counter += 1;
        }
    }
    runningData = result;
    return;
}
