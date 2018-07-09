/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 400);
    
var circle = svg.append("circle")
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", 20)
    .attr("fill", "purple");
    
var line = svg.append("line")
    .attr("x1", 100)
    .attr("y1", 100)
    .attr("x2", 200)
    .attr("y2", 50)
    .attr("stroke", "blue")
    .attr("stroke-width", 3);
    
var rect = svg.append("rect")
    .attr("x", 200)
    .attr("y", 200)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("width", 100)
    .attr("height", 50)
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .attr("fill", "white");
    
var rect = svg.append("ellipse")
    .attr("cx", 100)
    .attr("cy", 300)
    .attr("rx", 60)
    .attr("ry", 90)
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("fill", "pink");