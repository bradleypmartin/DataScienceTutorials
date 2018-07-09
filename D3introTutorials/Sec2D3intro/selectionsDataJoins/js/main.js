/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.6 - Activity: joining SVGs with data
*/

// declaring an array of data
var data = [25, 20, 10, 12, 15];

// laying out an s3 canvas
var svg = d3.select("#chart-area").append("svg")
    .attr("width", 400)
    .attr("height", 400);

// note this syntax is interesting, since we don't really have any circles defined yet
// (but we will in a moment, based on 'data')
var circles = svg.selectAll("circle")
    .data(data);

// defining circles on our canvas
// note how we use the data present to specify radius and position!
circles.enter()
    .append("circle")
        .attr("cx", function(d, i){
            return (i * 50) + 25;
        })
        .attr("cy", 25)
        .attr("r", function(d){
            return d;
        })
        .attr("fill", "red");