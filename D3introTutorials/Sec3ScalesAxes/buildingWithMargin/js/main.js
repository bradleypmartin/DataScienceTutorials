/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.x - Activity: using linear scaling
*/

// including margin
var margin = { left: 100, right: 10, top: 10, bottom: 100 };

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

// I'm going to use jQuery here rather than d3.json() - jQuery's working better than d3
// in my current environment (AWS c9). Altered .json file to contain meter heights rather than pixels.
$.getJSON("data/buildHeightMeters.json")
.then(function(data){
    // logging imported JSON data
    console.log(data);
    
    data.forEach(function(d){
        // converting height values to integer (from str)
        // (not necessary here, but may be with other object imports)
        d.height = +d.height;
    });
    
    // setting up x-scaling to expand into canvas. In this exercise, we're going
    // to avoid enumerating all of the band names manually, and use a function
    // to take care of the task.
    var x = d3.scaleBand()
        .domain(data.map(function(d){
            return d.name;
        }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);
    
    // setting up y-scaling map for our height bars (to match svg canvas)
    // ALSO using max/min to accomplish our scaling here.
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){
            return d.height;
        })])
        .range([0, height]);
    
    // adding rectangles to svg canvas... (now using group 'g' rather than just 'svg')
    var rectangles = g.selectAll("rect")
        .data(data);
        
    // ...and specifying height/position based on height data and index!
    rectangles.enter()
        .append("rect")
            .attr("x", function(d,i){
                // using x-scale to fill canvas horizontally
                return x(d.name);
            })
            .attr("y", 0)
            .attr("width", x.bandwidth)
            .attr("height", function(d){
                // using y-scaling to fill up canvas vertically
                return y(d.height);
            })
            .attr("fill","gray");
    
})
.catch(function(err){
    console.log(err);
});