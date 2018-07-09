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

// declaring flag for visualization toggle (between revenue and profit)
var flag = true;

var t = d3.transition().duration(750);

// laying out svg canvas
var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", "
        + margin.top + ")");

var xAxisGroup = g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")");

var yAxisGroup = g.append("g")
    .attr("class", "y-axis");

// setting up x-scaling to expand into canvas. In this exercise, we're going
// to avoid enumerating all of the band names manually, and use a function
// to take care of the task.
var x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.2)
    .paddingOuter(0.2);

// setting up y-scaling map for our height bars (to match svg canvas)
// ALSO using max/min to accomplish our scaling here.
var y = d3.scaleLinear()
    .range([height, 0]);

// X Label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month");
    
// Y Label
var yLabel = g.append("text")
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
        d.revenue = +d.revenue;
        d.profit  = +d.profit;
    });
    
    // scheduling data update function
    d3.interval(function(){
        var newData = flag ? data : data.slice(1);
        
        update(newData);
        flag = !flag;
    }, 1000);
    
    // run the visualization for the first time (before the interval)
    update(data);
    
})
.catch(function(err){
    // error handling
    console.log(err);
});

// creating data update function
function update(data){
    
    var value = flag ? "revenue" : "profit";
    
    x.domain(data.map(function(d){return d.month;}));
    y.domain([0, d3.max(data, function(d){return d[value];})]);
    
    // setting up x-axis using x-axis scale
    var xAxisCall = d3.axisBottom(x);
    xAxisGroup.transition(t).call(xAxisCall);
    
    xAxisGroup.selectAll("text")
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
    yAxisGroup.transition(t).call(yAxisCall);
    
    // IMPORTANT: note the conventional D3 update pattern below.
    
    // DATA JOIN
    // Adding new data with old elements, if any.
    var rectangles = g.selectAll("circle")
        .data(data, function(d){
            return d.month;
        });
        
    // DATA EXIT
    // Remove old elements as needed.
    rectangles.exit()
        .attr("fill", "red")
    .transition(t)
        .attr("cy", y(0))
        .attr("r", 0)
        .remove();
        
    // ENTER
    // Create new elements as needed.
    rectangles.enter()
        .append("circle")
            .attr("cx", function(d,i){return x(d.month) + x.bandwidth() / 2;})
            .attr("r", 5)
            .attr("fill","gray")
            .attr("cy", y(0))
            // AND UPDATE old elements present in new data.
            .merge(rectangles)
            .transition(t)
                .attr("cx", function(d,i){return x(d.month) + x.bandwidth() / 2;})
                .attr("cy", function(d){return y(d[value]);});
    
    // updating y-label text        
    var label = flag ? "Revenue" : "Profit";
    yLabel.text(label);
}