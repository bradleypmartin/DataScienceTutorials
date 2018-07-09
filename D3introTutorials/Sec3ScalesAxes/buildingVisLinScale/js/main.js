/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.x - Activity: using linear scaling
*/

// laying out svg canvas
var svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 420);

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
    
    // setting up x-scaling to expand into canvas. Note how the addition of
    // two more bands (once 5 were in here) only required inclusion of their
    // names in the domain.
    var x = d3.scaleBand()
        .domain(["Burj Khalifa", "Shanghai Tower",
            "Abraj Al-Bait Clock Tower", "Ping An Finance Centre",
            "Lotte World Tower", "One World Trade Center",
            "Guangzhou CTF Finance Center"])
        .range([0, 400])
        .paddingInner(0.3)
        .paddingOuter(0.3);
    
    // setting up y-scaling map for our height bars (to match svg canvas)
    var y = d3.scaleLinear()
        .domain([0, 828])
        .range([0, 400]);
    
    // adding rectangles to svg canvas...
    var rectangles = svg.selectAll("rect")
        .data(data);
        
    // ...and specifying height/position based on height data and index!
    rectangles.enter()
        .append("rect")
            .attr("x", function(d,i){
                // using x-scale to fill canvas horizontally
                return x(d.name);
            })
            .attr("y", 20)
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