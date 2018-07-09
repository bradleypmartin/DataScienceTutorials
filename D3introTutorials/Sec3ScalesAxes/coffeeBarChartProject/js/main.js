/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

// including margin
var margin = { left: 100, right: 10, top: 30, bottom: 100 };

// declaring canvas dimensions (including space for margin)
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

// laying out svg canvas
var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", "
        + margin.top + ")");

// X Label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");
    
// Y Label
g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");

// I'm going to use jQuery here rather than d3.json() - jQuery's working better than d3
// in my current environment (AWS c9). Altered .json file to contain meter heights rather than pixels.
$.getJSON("data/revenues.json")
.then(function(data){
    // logging imported JSON data
    console.log(data);
    
    data.forEach(function(d){
        // converting height values to integer (from str)
        // (not necessary here, but may be with other object imports)
        d.revenue = +d.revenue;
    });
    
    // setting up x-scaling to expand into canvas. In this exercise, we're going
    // to avoid enumerating all of the band names manually, and use a function
    // to take care of the task.
    var x = d3.scaleBand()
        .domain(data.map(function(d){
            return d.month;
        }))
        .range([0, width])
        .paddingInner(0.2)
        .paddingOuter(0.2);
    
    // setting up y-scaling map for our height bars (to match svg canvas)
    // ALSO using max/min to accomplish our scaling here.
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){
            return d.revenue;
        })])
        .range([height, 0]);
    
    // setting up x-axis using x-axis scale
    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxisCall)
        .selectAll("text")
            .attr("y", "15")
            .attr("x", "0")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-0)");
    
    // ...and y-axis with y-scale
    var yAxisCall = d3.axisLeft(y)
    .ticks(10)
    .tickFormat(function(d){
        return "$" + d;
    });
    
    g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall);
    
    // adding rectangles to svg canvas... (now using group 'g' rather than just 'svg')
    var rectangles = g.selectAll("rect")
        .data(data);
        
    // ...and specifying height/position based on height data and index!
    rectangles.enter()
        .append("rect")
            .attr("x", function(d,i){
                // using x-scale to fill canvas horizontally
                return x(d.month);
            })
            .attr("y", function(d){
                return y(d.revenue);
            })
            .attr("width", x.bandwidth)
            .attr("height", function(d){
                // using y-scaling to fill up canvas vertically
                return height - y(d.revenue);
            })
            .attr("fill","gray");
    
})
.catch(function(err){
    console.log(err);
});

