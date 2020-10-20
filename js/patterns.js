////////////////////////////////////////////////////////////
/////////////// Create SUN type pattern ////////////////////
////////////////////////////////////////////////////////////
function createSunPattern(wrapper, width, height) {

	//Get min size
	var size = Math.min(width/2, height/2);

	var sunWrapper = wrapper.append("g").attr("transform", "translate(" + (width/2) + "," + 0 + ")" );

	//Create 6 snowflake arms
	for(var i=0; i < 12; i++) {
		createSunArm(i*30);
	}//for i

	//Create circle
	sunWrapper.append("circle")
		.attr("class", "sun-circle")
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("r", size*0.4);

	//Create 1 arm of a snowflake
	function createSunArm(rotate) {
		sunWrapper.append("line")
			.attr("transform", "rotate(" + rotate + ")")
			.attr("class", "sun-line pattern-line")
			.attr("x1", 0)
			.attr("y1", size * 0.6)
			.attr("x2", 0)
			.attr("y2", size * 0.8);
	}//createSunArm

}//createSunPattern

////////////////////////////////////////////////////////////
////////////// Create NATURE type pattern //////////////////
////////////////////////////////////////////////////////////

function createNaturePattern(wrapper, width, height, xOffset, id) {

	var moveBack = xOffset ? xOffset : 0;

    //Divide width into pieces
    var stepSize = 7;
    var steps = width/stepSize + 1;
    var data = [];
    var oldY = 0;
    for(var i = 0; i <= steps; i++) {
    	var sign;
    	//If the line deviates too much, push it back
    	if(Math.abs(oldY) > height/2*0.4) {
    		sign = oldY < 0 ? 1 : -1;
    	} else {
    		sign = Math.random() > 0.5 ? 1 : -1;
    	}//else
    	var newY = oldY + sign * Math.random() * 0.25 * height/2;
    	var oldY = newY;
    	data.push({
    		x: -moveBack + i * stepSize,
    		y: newY
    	});
    }//for i

	var line = d3.line()
    	.x(function(d) { return d.x; })
    	.y(function(d) { return d.y; })
    	.curve(d3.curveCardinal.tension(0.5));

    //Create clip path for the patterns to fit nicely into the rectangles
    svg.append("defs")
    	.append("clipPath")
    	.attr("id", "clip-" + id)
        .append("rect")
        .attr("width",  width)
        .attr("height", height)
        .attr("y", -height/2)
        .attr("x", -moveBack);

	//Create lines
	wrapper.append("path")
		.attr("clip-path", "url(#clip- " + id + ")")
		.style("clip-path", "url(#clip-" + id + ")") //make it work in safari
		.datum(data)
		.attr("class", "nature-line pattern-line")
		.attr("d", line);

}//createNaturePattern

////////////////////////////////////////////////////////////
////////////// Create CULTURE type pattern /////////////////
////////////////////////////////////////////////////////////

function createCulturePattern(wrapper, width, height, xOffset, id) {

	var moveBack = xOffset ? xOffset : 0;

    var stepSize = 14;
    var baseLine = height/2*0.5;
	var data = [
		{x: 0*stepSize, y: baseLine},
		{x: 0.5*stepSize, y: baseLine},
		{x: 0.5*stepSize, y: -height/2 * 0.15},
		{x: 1*stepSize, y: -height/2 * 0.4},
		{x: 1.5*stepSize, y: -height/2 * 0.15},
		{x: 1.5*stepSize, y: baseLine},
		{x: 2.5*stepSize, y: baseLine},
		{x: 2.5*stepSize, y: -height/2 * 0.7},
		{x: 3*stepSize, y: -height/2 * 0.7},
		{x: 3*stepSize, y: baseLine},
		{x: 3.5*stepSize, y: baseLine},
		{x: 3.5*stepSize, y: -height/2 * 0.5},
		{x: 4.5*stepSize, y: -height/2 * 0.5},
		{x: 4.5*stepSize, y: baseLine},
		{x: 5.5*stepSize, y: baseLine},
		{x: 5.5*stepSize, y: -height/2 * 0.05},
		{x: 6*stepSize, y: -height/2 * 0.3},
		{x: 6.5*stepSize, y: -height/2 * 0.05},
		{x: 6.5*stepSize, y: baseLine},
		{x: 7*stepSize, y: baseLine},
		{x: 7.5*stepSize, y: -height/2 * 0.7},
		{x: 8*stepSize, y: baseLine},
		{x: 9*stepSize, y: baseLine}
	];

	//Only take the needed amount of steps
	data = data.filter(function(d) { return d.x <= width + stepSize; });

	var line = d3.line()
    	.x(function(d) { return -moveBack + d.x; })
    	.y(function(d) { return d.y; });

    //Create clip path for the patterns to fit nicely into the rectangles
    svg.append("defs")
    	.append("clipPath")
    	.attr("id", "clip-" + id)
        .append("rect")
        .attr("width",  width)
        .attr("height", height)
        .attr("y", -height/2)
        .attr("x", -moveBack);

	//Create lines
	wrapper.append("path")
		.attr("clip-path", "url(#clip- " + id + ")")
		.style("clip-path", "url(#clip-" + id + ")") //make it work in safari
		.datum(data)
		.attr("class", "culture-line pattern-line")
		.attr("d", line);

}//createCulturePattern

////////////////////////////////////////////////////////////
///////////////// Create SNOW type pattern /////////////////
////////////////////////////////////////////////////////////

function createSnowPattern(wrapper, width, height) {

	//Get min size
	var size = Math.min(width/2, height/2);

	var snowWrapper = wrapper.append("g").attr("transform", "translate(" + (width/2) + "," + 0 + ")" );

	//Create 6 snowflake arms
	for(var i=0; i < 6; i++) {
		createSnowArm(i*60);
	}//for i

	//Create 1 arm of a snowflake
	function createSnowArm(rotate) {
		var snowArm = snowWrapper.append("g").attr("transform", "rotate(" + rotate + ")");

		snowArm.append("line")
			.attr("class", "snow-line pattern-line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", 0)
			.attr("y2", size * 0.8);

		snowArm.append("line")
			.attr("class", "snow-line pattern-line")
			.attr("x1", 0)
			.attr("y1", size * 0.5)
			.attr("x2", -size * 0.25)
			.attr("y2", size * 0.65);
		snowArm.append("line")
			.attr("class", "snow-line pattern-line")
			.attr("x1", 0)
			.attr("y1", size * 0.5)
			.attr("x2", size * 0.25)
			.attr("y2", size * 0.65);
	}//createSnowArm

}//createSnowPattern

////////////////////////////////////////////////////////////
////////////// Create CHRISTMAS type pattern ///////////////
////////////////////////////////////////////////////////////

function createChristmasPattern(wrapper, width, height) {

	//Translate the wrapper to the middle
	var christmasWrapper = wrapper.append("g").attr("transform", "translate(" + (width/2) + "," + (height/2) + ")" );

	//Maximum width
	width = width > 45 ? 40 : width;

	var data = [
		{x: 0, y: -height*0.15},
		{x: width/2*0.2, y: -height*0.15},
		{x: width/2*0.2, y: -height*0.3},
		{x: width/2*0.8, y: -height*0.3},
		{x: width/2*0.4, y: -height*0.5},
		{x: width/2*0.55, y: -height*0.5},
		{x: width/2*0.2, y: -height*0.7},
		{x: width/2*0.35, y: -height*0.7},
		{x: 0, y: -height*0.9}
	];

	var lineLeft = d3.line()
    	.x(function(d) { return -d.x; })
    	.y(function(d) { return d.y; });

	var lineRight = d3.line()
    	.x(function(d) { return d.x; })
    	.y(function(d) { return d.y; });

	//Create lines
	christmasWrapper.append("path")
		.datum(data)
		.attr("class", "christmas-line pattern-line")
		.attr("d", lineLeft);
	christmasWrapper.append("path")
		.datum(data)
		.attr("class", "christmas-line pattern-line")
		.attr("d", lineRight);

}//createChristmasPattern

////////////////////////////////////////////////////////////
//////////////// Create DISNEY type pattern ////////////////
////////////////////////////////////////////////////////////

function createDisneyPattern(wrapper, width, height) {

	//Mickey head SVG is 120px wide and 90 px high
	var scale = width / 120;

	//Create lines
	wrapper.append("path")
		.attr("class", "disney-line pattern-line")
		.attr("transform", "scale(" + scale + ")translate(0,-45)")
		.style("stroke-width", 1.5 / scale)
		.attr("d", "M101.75,8.67c-9-7.61-21.54-7.53-28.09.18A17.36,17.36,0,0,0,70.34,24.3a32.44,32.44,0,0,0-20.55-.58A17.26,17.26,0,0,0,46.34,8.85c-6.55-7.71-19.13-7.79-28.09-.18s-10.92,20-4.37,27.75c3.78,4.45,9.57,6.35,15.51,5.71a32.33,32.33,0,1,0,59.51-.26c6.53,1.25,13.09-.57,17.24-5.45C112.68,28.71,110.72,16.28,101.75,8.67Z");

}//createDisneyPattern

////////////////////////////////////////////////////////////
//////////////// Create SAFARI type pattern ////////////////
////////////////////////////////////////////////////////////

function createSafariPattern(wrapper, width, height, xOffset) {

	var moveBack = xOffset ? xOffset : 0;

	//Safari pattern 200px wide and 100 px high
	var scale = width / 200;

	//Create lines
	var safariWrapper = wrapper.append("g")
		.attr("transform", "translate(" + -moveBack + ",0)scale(" + scale + ")translate(0,-45)");

	//Ground line
	safariWrapper.append("line")
			.attr("class", "safari-line pattern-line")
			.style("stroke-width", 1.5 / scale)
			.attr("x1", -1.67)
			.attr("y1", 80)
			.attr("x2", 202)
			.attr("y2", 80);

	//Elephant body
	safariWrapper.append("path")
		.attr("class", "safari-line pattern-line")	
		.style("stroke-width", 1.5 / scale)
		.attr("d", "M22.94,79S7,35.55,49.75,33.8c38.5-.05,33.75,41,33.75,41l-4.25.27s.5-17.42-8.25-17.51S60.75,79,60.75,79H50s1.23-9.36-9-9.61S32.72,79,32.72,79Z");
	//Elephant ear
	safariWrapper.append("path")
		.attr("class", "safari-line pattern-line")	
		.style("stroke-width", 1.5 / scale)
		.attr("d", "M64,40.75s-15.75-9.5-13,7.75,9,8.34,9,8.34Z");

	//Giraffe antenna
	safariWrapper.append("circle")
		.attr("class", "safari-circle")
		.attr("cx", 144)
		.attr("cy", 5)
		.attr("r", 2);
	safariWrapper.append("circle")
		.attr("class", "safari-circle")
		.attr("cx", 140)
		.attr("cy", 5.5)
		.attr("r", 2);

	//Giraffe body
	safariWrapper.append("path")
		.attr("class", "safari-line pattern-line")	
		.style("stroke-width", 1.5 / scale)
		.attr("d", "M152.79,79,142.25,15.79l-8-1.06-.85-2.7,11.16-2.52,9.33,31.16S172,44.84,174.17,55.34s.12,23.6.12,23.6H173S172.68,48.16,154,55.7c0,.53.07,23.44.07,23.14");

}//createSafariPattern

////////////////////////////////////////////////////////////
////////////// Create OLYMPICS type pattern ////////////////
////////////////////////////////////////////////////////////

function createOlympicsPattern(wrapper, width, height) {

	//Olympic torch 50px wide and 100 px high
	var scale = width / 30;

	//Create lines
	var olympicsWrapper = wrapper.append("g")
		.attr("transform", "scale(" + scale + ")translate(0,-50)");

	//Flame
	olympicsWrapper.append("path")
		.attr("class", "olympics-line pattern-line")	
		.style("stroke-width", 1.5 / scale)
		.attr("d", "M7.2,28.63S3.83,39.36,15.86,39.5c8.92.1,8.74-11.08,4.78-12.83-3.58-1.58-2.12-4.8.84-7-7.42.38-8.33,8.79-9.71,8.83s-2.3-2.93-1.13-4.76C9.82,23.8,7.53,27.75,7.2,28.63Z");
	//Torch
	olympicsWrapper.append("path")
		.attr("class", "olympics-line pattern-line")	
		.style("stroke-width", 1.5 / scale)
		.attr("d", "M14.85,82 L8.5,40 L21.5,40 Z");
	//Torch line
	olympicsWrapper.append("line")
			.attr("class", "olympics-line pattern-line")
			.style("stroke-width", 1.5 / scale)
			.attr("x1", 9.34)
			.attr("y1", 45.52)
			.attr("x2", 20.58)
			.attr("y2", 45.52);
}//createOlympicsPattern