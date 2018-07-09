/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

// laying out svg canvas
var svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 400);

// I'm going to use jQuery here rather than d3.json() - jQuery's working better than d3
// in my current environment (AWS c9)
$.getJSON("data/buildings.json")
.then(function(data){
    // logging imported JSON data
    console.log(data);
    
    data.forEach(function(d){
        // converting height values to integer (from str)
        // (not necessary here, but may be with other object imports)
        d.height = +d.height;
    });
    
    // adding rectangles to svg canvas...
    var rectangles = svg.selectAll("rect")
        .data(data);
        
    // ...and specifying height/position based on height data and index!
    rectangles.enter()
        .append("rect")
            .attr("x", function(d,i){
                return i*20;
            })
            .attr("y", 10)
            .attr("width",15)
            .attr("height", function(d){
                return d.height*0.5;
            })
            .attr("fill","gray");
    
})
.catch(function(err){
    console.log(err);
});