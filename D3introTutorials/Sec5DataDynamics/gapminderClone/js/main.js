/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

// including margin
var margin = { left: 100, right: 10, top: 30, bottom: 100 };

// declaring canvas dimensions (including space for margin)
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

// declaring flag for visualization toggle (between revenue and profit)
var flag = true;

var t = d3.transition().duration(250);

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

// setting up x-scaling to expand into canvas.
var x = d3.scaleLog()
    .range([0, width]);

// setting up y-scaling
var y = d3.scaleLinear()
    .range([height, 0]);
    
// r-scaling
var area = d3.scaleLinear()
    .range([25*Math.PI, 1500*Math.PI])
    .domain([2000, 1400000000]);

// continent (ordinal) scaling
var continentColor = d3.scaleOrdinal(d3.schemeSet1);

// X Label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("GDP Per Capita ($)");
    
// Y Label
var yLabel = g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Life Expectancy (Years)");

// time label
var timeLabel = g.append("text")
    .attr("y", height -10)
    .attr("x", width - 40)
    .attr("font-size", "40px")
    .attr("opacity", "0.4")
    .attr("text-anchor", "middle")
    .text("1800");

// I'm going to use jQuery here rather than d3.json() - jQuery's working better than d3
// in my current environment (AWS c9). Altered .json file to contain meter heights rather than pixels.
$.getJSON("data/data.json")
.then(function(data){
    // logging imported JSON data
    // console.log(data);
    
    x.domain([100, 100000]);
    y.domain([0, 90]);
    
    // setting up x-axis using x-axis scale
    var xAxisCall = d3.axisBottom(x)
    .tickValues([400, 4000, 40000])
    .tickFormat(d3.format("$"));
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
        return d;
    });
    yAxisGroup.transition(t).call(yAxisCall);
    
    // Clean data
    const formattedData = data.map(function(year){
        return year["countries"].filter(function(country){
            var dataExists = (country.income && country.life_exp);
            return dataExists
        }).map(function(country){
            country.income = +country.income;
            country.life_exp = +country.life_exp;
            return country;            
        })
    });
    
    var yearIndex = 0;
    
    // scheduling data update function
    d3.interval(function(){
        yearIndex++;
        yearIndex = (yearIndex === data.length) ? 0 : yearIndex;
        update(formattedData[yearIndex], yearIndex);
    }, 300);
    
    // run the visualization for the first time (before the interval)
    update(formattedData[0], 0);
    
})
.catch(function(err){
    // error handling
    console.log(err);
});

// creating data update function
function update(data, yearIndex){
    
    // IMPORTANT: note the conventional D3 update pattern below.
    
    // DATA JOIN
    // Adding new data with old elements, if any.
    var circles = g.selectAll("circle")
        .data(data, function(d){
            return d.country;
        });
        
    // DATA EXIT
    // Remove old elements as needed.
    circles.exit()
        .attr("class", "exit")
        .remove();
        
    // ENTER
    // Create new elements as needed.
    circles.enter()
        .append("circle")
            .attr("class", "enter")
            .attr("r", 5)
            .attr("fill", function(d) {return continentColor(d.continent);})
            // AND UPDATE old elements present in new data.
            .merge(circles)
            .transition(t)
                .attr("cx", function(d){return x(d.income);})
                .attr("cy", function(d){return y(d.life_exp);})
                .attr("r", function(d){return Math.sqrt(area(d.population) / Math.PI)});
    
    // Update the time label
    timeLabel.text(+(yearIndex + 1800));
}