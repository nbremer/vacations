///////////////////////////////////////////////////////////////////////////
//////////////////// Set up and initiate svg containers ///////////////////
///////////////////////////////////////////////////////////////////////////	

var margin = {
	top: 150,
	right: 0,
	bottom: 100,
	left: 310
};
var width = 1120;
var height = 2600;
			
//SVG container
var svg = d3.select('#travel-chart')
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + (width*0.5 + margin.left) + "," + margin.top + ")")
	.style("isolation", "isolate");

///////////////////////////////////////////////////////////////////////////
//////////////////////////// Create scales ////////////////////////////////
///////////////////////////////////////////////////////////////////////////

var colorScale = d3.scaleOrdinal()
	//.range(["#429C2F", 	"#991C71", 	"#96AF1B", 	"#11A2AF", 		"#B9121B", 	"#EFB605", 	"#E47803", 		"#66489E", 	"#10A66E", 	"#1D7EB0"])
	//.domain(["africa",	"asia",		"canada",	"carribean",	"europe",	"france",	"netherlands",	"oceania",	"turkey",	"usa"]);
	.range(["#EFB605",	"#E47803", 		"#B9121B", 	"#991C71",	"#66489E",	"#10A66E", 	"#429C2F", 	"#96AF1B", 	"#11A2AF",	"#1D7EB0"])
	.domain(["france",	"netherlands",	"europe",	"asia",		"oceania",	"turkey",	"africa",	"canada",	"carribean",	"usa"]);

var parseDate = d3.timeParse("%d/%m/%y");
var msPerDay = 1000 * 60 * 60 * 24;

var yearScale = d3.scaleLinear()
	.range([0, height])
	.domain([1987, 2016]);

var dayScale = d3.scaleLinear()
	.range([0, 150])
	.domain([0, 31]);

var dayStartScale = d3.scaleLinear()
	.range([0, 150])
	.domain([1, 32]);

//var fullMonth = dayScale(31);
var emptyPerc = 0.2;
//var emptyMonth = dayScale(31) * emptyPerc;

var months = [
	{month: "January", 	days: 31, offset: -7},
	{month: "February", days: 28, offset: -6}, //most of the time
	{month: "March", 	days: 31, offset: -5},
	{month: "April", 	days: 30, offset: -4},
	{month: "May", 		days: 31, offset: -3},
	{month: "June", 	days: 30, offset: -2},
	{month: "July", 	days: 31, offset: -1},
	{month: "August", 	days: 31, offset: 0},
	{month: "September", days: 30, offset: 1},
	{month: "October", 	days: 31, offset: 2},
	{month: "November", days: 30, offset: 3},
	{month: "December", days: 31, offset: 4}
];

var years = d3.range(1987,2017,1);

var joyScale = d3.scaleLinear()
	.range([20, 70])
	.domain([5, 10]);

//Calculate the height that one month will have
var monthHeight = yearScale(1991) - yearScale(1990);
var monthLineHeight = monthHeight * 0.8;

//Function for the month lines
var monthLineFunction = d3.line()
	.x(function(d) { return d.x; })
	.y(function(d) { return d.y; })
	.curve(d3.curveMonotoneY)
	.defined(function(d) { return d.y !== null; });

var monthAreaFunction = d3.area()
    .y(function(d,i) { return d.y; })
    .x0(function(d,i) { return d.x0; })
    .x1(function(d,i) { return d.x1; })
    .curve(d3.curveMonotoneY)
    .defined(function(d) { return d.y !== null; });

//Create empty array, one for each month, that will contain the datapoints for the month lines
var monthLineData = [],
	monthAreaData = [];
for (var i = 0; i < (months.length + 1); i++)	
    monthLineData.push([]);

///////////////////////////////////////////////////////////////////////////
///////////////////////// Create blur filters /////////////////////////////
///////////////////////////////////////////////////////////////////////////

var defs = svg.append("defs");

//Create a filter to blur the vacation rectangle in the vertical direction for unknown enjoyment
defs.append("filter")
	.attr("id", "vertical-blur-filter")
	.attr("height", "300%")	//increase the width of the filter region to remove blur "boundary"
	.attr("y", "-100%") //make sure the center of the "width" lies in the middle
	.attr("color-interpolation-filters","sRGB") //to fix safari: http://stackoverflow.com/questions/24295043/svg-gaussian-blur-in-safari-unexpectedly-lightens-image
	.append("feGaussianBlur")
	.attr("in","SourceGraphic")
	.attr("stdDeviation","0 6");
//Create a filter to blur the vacation rectangle in the horizontal direction for unknown duration
defs.append("filter")
	.attr("id", "horizontal-blur-filter")
	.attr("width", "300%")
	.attr("x", "-100%") 
	.attr("color-interpolation-filters","sRGB")
	.append("feGaussianBlur")
	.attr("in","SourceGraphic")
	.attr("stdDeviation","10 0");
defs.append("filter")
	.attr("id", "horizontal-blur-filter-small")
	.attr("width", "300%")
	.attr("x", "-100%") 
	.attr("color-interpolation-filters","sRGB")
	.append("feGaussianBlur")
	.attr("in","SourceGraphic")
	.attr("stdDeviation","4 0");
//Create a filter to blur the vacation rectangle in both directions for unknown enjoyment & duration
defs.append("filter")
	.attr("id", "both-directions-blur-filter")
	.attr("width", "300%")
	.attr("x", "-100%")
	.attr("height", "300%")
	.attr("y", "-100%")
	.attr("color-interpolation-filters","sRGB")
	.append("feGaussianBlur")
	.attr("in","SourceGraphic")
	.attr("stdDeviation","10 6");

///////////////////////////////////////////////////////////////////////////
/////////////////////////// Create wrappers ///////////////////////////////
///////////////////////////////////////////////////////////////////////////

//Create a wrapper for the areas the highlight as a month
var monthAreaWrapper = svg.append("g").attr("class", "monthAreaWrapper");

//Create a wrapper for all of the month seperation lines
var monthLineWrapper = svg.append("g").attr("class", "monthLineWrapper");

//Create a wrapper for the titles and months
var titleWrapper = svg.append("g").attr("class", "titleWrapper");

//Create a wrapper for the titles and months
var axisWrapper = svg.append("g").attr("class", "axisWrapper");

////////////////////////////////////////////////////////////
///////////////////// Read in the data /////////////////////
////////////////////////////////////////////////////////////

d3.csv('data/vacations_nadieh.csv', function (error, data) {

	if (error) throw error;

	////////////////////////////////////////////////////////////
	///////////////////// Prepare the data /////////////////////
	////////////////////////////////////////////////////////////
				
	data.forEach(function(d) {
		d.year = +d.year;
		d.enjoyment = +d.enjoyment;

		if( d.startdate !== "" ) {
			d.startDate = parseDate(d.startdate);
			d.endDate = parseDate(d.enddate);

			d.startDay = d.startDate.getDate();
			d.startMonth = d.startDate.getMonth() + 1;
			d.endDay = d.endDate.getDate();
			d.endMonth = d.endDate.getMonth() + 1;

			d.daysVacation = Math.floor((d.endDate - d.startDate)/msPerDay) + 1; 
		}//if
	});

	//Nest by year
	var yearData = d3.nest()
		.key(function(d) { return d.year; })
		.entries(data);

	////////////////////////////////////////////////////////////
	//////////////////// Create year groups ////////////////////
	////////////////////////////////////////////////////////////

	//Create a group for each year
	var yearGroups = svg.selectAll(".year-group")
		.data(yearData)
		.enter().append("g")
		.attr("class", function(d) { return "year-group year-" + d.key; })
		.attr("transform", function(d) { return "translate(0," + yearScale(d.key) + ")"; })
		.each(function(d,i) {

			var el = d3.select(this);

			//Create a wrapper for all the vacations in the chosen year
			var vacationYearWrapper = el.append("g").attr("class","vacationYearWrapper");

			//Loop over the months, earlier then August
			var monthOffset = 0;
			for(var k = -1; k > -8; k--) {
				monthOffset = loopThroughMonths(k, monthOffset, -1)
			}//for k
			//Loop over the months, August and on
			var monthOffset = 0;
			for(var k = 0; k < 5; k++) {
				monthOffset = loopThroughMonths(k, monthOffset, 1)
			}//for k

			//Append the final data to find the end of December
			monthLineData[12].push({x: monthOffset, y: null });
			monthLineData[12].push({x: monthOffset, y: -monthLineHeight/2*0.5 + yearScale(d.key) });
			monthLineData[12].push({x: monthOffset, y: monthLineHeight/2*0.5 + yearScale(d.key) });
			monthLineData[12].push({x: monthOffset, y: null });

			function loopThroughMonths(k, monthOffset, sign) {

				var chosenMonth = months.filter(function(m) { return m.offset === k;});
				var monthWidth = dayScale(chosenMonth[0].days);

				//Find the month(s) where the chosenMonth was a start date (if any)
				var vacations = d.values.filter(function(v) { return v.startMonth === k+8;});
				//And the months where this month is an end month
				var endMonths = d.values.filter(function(v) { return v.endMonth === k+8;});

				if(sign === 1) {
					//Save month points into array per month and then plot them as a line in the end
					monthLineData[k+7].push({x: monthOffset, y: null });
					monthLineData[k+7].push({x: monthOffset, y: -monthLineHeight/2*0.5 + yearScale(d.key) });
					monthLineData[k+7].push({x: monthOffset, y: monthLineHeight/2*0.5 + yearScale(d.key) });
					monthLineData[k+7].push({x: monthOffset, y: null });
				}//if

				//Keeps track of totalWidth in case of joined vacations
				//This idea only works because these vacations all lie in the same month o_O
				var totalWidth = 0;
				var totalWidthLabel = 0;

				if( vacations.length > 0) {

					if(sign === -1) monthOffset = monthOffset + sign * monthWidth;

					vacations.forEach(function(v,j) {
						
						if(v.combine_with_previous !== "y" && v.combine_with_previous !== "l") totalWidth = 0;
						totalWidth = totalWidth + dayScale(v.daysVacation);

						if(v.combine_with_previous !== "y" && v.combine_with_previous !== "l" && v.combine_with_previous !== "e") totalWidthLabel = 0;
						totalWidthLabel = totalWidthLabel + dayScale(v.daysVacation);

						var vacationHeight = joyScale(isNaN(v.enjoyment) ? 7 : v.enjoyment);

						//For unknown enjoyment or duration apply a blur filter
						var filterUse = null;
						if(isNaN(v.enjoyment) && v.exact_duration === "unknown") { filterUse = "url(#both-directions-blur-filter)"; }
						else if(isNaN(v.enjoyment)) { filterUse = "url(#vertical-blur-filter)"; }
						else if(v.exact_duration === "unknown") { 
							if(v.daysVacation < 10) { filterUse = "url(#horizontal-blur-filter-small)"; }
							else { filterUse = "url(#horizontal-blur-filter)"; }
						}//else if

						//Append group for this vacation
						var vacationWrapper = vacationYearWrapper.append("g")
							.attr("class","vacationWrapper")
							.attr("transform", "translate(" + (monthOffset + dayStartScale(v.startDay)) + ",0)");
						
						//Append vacation rectangle to visual
						vacationWrapper.append("rect")	
							.attr("width", dayScale(v.daysVacation))
							.attr("height", vacationHeight)
							.attr("y", -vacationHeight/2)
							.style("filter", filterUse)
							.style("fill", colorScale(v.continent))
							//.style("mix-blend-mode","multiply");

						//Only do for the first in a series
						if(v.combine_with_previous === "n" || v.combine_with_previous === "f") {
							//Add people icons on top
							var iconLoc = 0;
							var icon_y_loc = -vacationHeight/2 - (isNaN(v.enjoyment) ? 2 : 0) 
							if(v.with_ralph === "y") { iconLoc = createRalphIcon(vacationWrapper, icon_y_loc, iconLoc); }
							if(v.with_father === "y") { iconLoc = createFatherIcon(vacationWrapper, icon_y_loc, iconLoc); }
							if(v.with_mother === "y") { iconLoc = createMotherIcon(vacationWrapper, icon_y_loc, iconLoc); }
							if(v.with_inlaws === "y") { iconLoc = createInlawsIcon(vacationWrapper, icon_y_loc, iconLoc); }
							if(v.with_other !== "") { iconLoc = createOtherIcon(vacationWrapper, icon_y_loc, iconLoc); }
						}//if

						//Add location labels below
						if(v.combine_with_previous !== "f" && v.combine_with_previous !== "y") {
							vacationWrapper.append("text")
								.attr("class", "vacation-location-label")
								.attr("x", -(totalWidthLabel - dayScale(v.daysVacation)) + totalWidthLabel/2)
								.attr("y", vacationHeight/2 + (isNaN(v.enjoyment) ? 3 : 0) )
								.attr("dy", "1em")
								.text(v.label);
						}//if

						//Add the pattern
						var uniqueID = v.continent + "_" + v.label.replace(/\s+/g, '-').toLowerCase() + "-" + v.year;
						if(v.type === "sun") {
							var patternWrapper = vacationWrapper.append("g").attr("class","sun-pattern");
							createSunPattern(patternWrapper, dayScale(v.daysVacation), vacationHeight);
						} else if(v.type === "nature") {
							if(v.combine_with_previous === "n" || v.combine_with_previous === "e") {
								var patternWrapper = vacationWrapper.append("g").attr("class","nature-pattern");
								createNaturePattern(patternWrapper, dayScale(v.daysVacation), vacationHeight, 0, uniqueID);
							} else if(v.combine_with_previous === "l") {
								var patternWrapper = vacationWrapper.append("g").attr("class","nature-pattern");
								createNaturePattern(patternWrapper, totalWidth, vacationHeight, totalWidth - dayScale(v.daysVacation), uniqueID);
							}//else  
						} else if(v.type === "culture") {
							if(v.combine_with_previous === "n") {
								var patternWrapper = vacationWrapper.append("g").attr("class","culture-pattern");
								createCulturePattern(patternWrapper, dayScale(v.daysVacation), vacationHeight, 0, uniqueID);
							} else if(v.combine_with_previous === "l") {
								var patternWrapper = vacationWrapper.append("g").attr("class","culture-pattern");
								createCulturePattern(patternWrapper, totalWidth, vacationHeight, totalWidth - dayScale(v.daysVacation), uniqueID);
							}//else  
						} else if(v.type === "snow") {
							var patternWrapper = vacationWrapper.append("g").attr("class","snow-pattern");
							createSnowPattern(patternWrapper, dayScale(v.daysVacation), vacationHeight); 
						} else if(v.type === "christmas") {
							var patternWrapper = vacationWrapper.append("g").attr("class","christmas-pattern");
							createChristmasPattern(patternWrapper, dayScale(v.daysVacation), vacationHeight); 
						} else if(v.type === "disney") {
							var patternWrapper = vacationWrapper.append("g").attr("class","disney-pattern");
							createDisneyPattern(patternWrapper, dayScale(v.daysVacation), vacationHeight); 
						} else if(v.type === "safari") {
							if(v.combine_with_previous === "n") {
								var patternWrapper = vacationWrapper.append("g").attr("class","safari-pattern");
								createSafariPattern(patternWrapper, dayScale(v.daysVacation), vacationHeight);
							} else if(v.combine_with_previous === "l") {
								var patternWrapper = vacationWrapper.append("g").attr("class","safari-pattern");
								createSafariPattern(patternWrapper, totalWidth, vacationHeight, totalWidth - dayScale(v.daysVacation));
							}//else 
						} else if(v.type === "olympics") {
							var patternWrapper = vacationWrapper.append("g").attr("class","olympics-pattern");
							createOlympicsPattern(patternWrapper, dayScale(v.daysVacation), vacationHeight); 
						}//if

					});//for each
					
					if(sign === 1) monthOffset = monthOffset + sign * monthWidth;	

				} else if ( endMonths.length > 0 ) {
					monthOffset = monthOffset + sign * monthWidth;
				} else {
					monthOffset = monthOffset + sign * monthWidth * emptyPerc;
				}//else

				if(sign === -1) {
					//Save month points into array per month and then plot them as a line in the end
					monthLineData[k+7].push({x: monthOffset, y: null });
					monthLineData[k+7].push({x: monthOffset, y: -monthLineHeight/2*0.5 + yearScale(d.key) });
					monthLineData[k+7].push({x: monthOffset, y: monthLineHeight/2*0.5 + yearScale(d.key) });
					monthLineData[k+7].push({x: monthOffset, y: null });
				}//if

				return monthOffset;

			}//loopThroughMonths

		});//each

	////////////////////////////////////////////////////////////
	//////////////////// Draw year lines ///////////////////////
	////////////////////////////////////////////////////////////

	var filteredData = [],
		monthPositionStart = [],
		monthPositionEnd = [];
	for(var j = 0; j < (monthLineData.length-1); j++) {
		//Take the first x-position from every month
		monthPositionStart.push(monthLineData[j][0].x);
		//Take the last x-position from every month
		monthPositionEnd.push(monthLineData[j][monthLineData[j].length - 1].x);
		//Filter the nulls from the data
		filteredData[j] = monthLineData[j].filter(monthLineFunction.defined());
	}//for i

	monthLineWrapper.selectAll(".inbetween-month-line")
		.data(filteredData)
		.enter().append("path")
		.attr("class", "inbetween-month-line")
		.attr("d", function(d) { return monthLineFunction(d); });

	monthLineWrapper.selectAll(".month-line")
		.data(monthLineData.filter(function(d,i) { return i < 12; }))
		.enter().append("path")
		.attr("class", "month-line")
		.attr("d", function(d) { return monthLineFunction(d); });

	////////////////////////////////////////////////////////////
	/////////////////// Create month titles ////////////////////
	////////////////////////////////////////////////////////////

	//Append the month names to the top
	axisWrapper.selectAll(".month-title-top")
		.data(monthPositionStart)
		.enter().append("text")
		.attr("class", "month-title month-title-top")
		.attr("x", function(d) { return d; })
		.attr("y", function(d,i) { return i%2 === 0 ? -30 : -50; })
		.text(function(d,i) { return months[i].month; });
	//Append the month names to the bottom
	axisWrapper.selectAll(".month-title-bottom")
		.data(monthPositionEnd)
		.enter().append("text")
		.attr("class", "month-title month-title-bottom")
		.attr("x", function(d) { return d; })
		.attr("y", function(d,i) { return height + (i%2 === 0 ? 50 : 70); })
		.text(function(d,i) { return months[i].month; });
	//Append the years to the side
	titleWrapper.selectAll(".year-title")
		.data(years)
		.enter().append("text")
		.attr("class", "year-title")
		.attr("x", -width/2 - margin.left + 70)
		.attr("y", function(d) { return yearScale(d); })
		.attr("dy", "0.3em")
		.style("opacity", function(d,i) { return i%3 === 0 ? 1 : 0; })
		.text(function(d) { return d; });

	////////////////////////////////////////////////////////////
	//////////////////// Create annotations ////////////////////
	////////////////////////////////////////////////////////////	

	var xOffset = -width/2 - margin.left + 100;
	createAnnotations(titleWrapper, monthLineData, dayStartScale, dayScale, emptyPerc, yearScale, monthLineHeight, xOffset);

	////////////////////////////////////////////////////////////
	//////////////////// Create the legend /////////////////////
	////////////////////////////////////////////////////////////

	var legendWrapper = svg.append("g").attr("transform", "translate(" + (xOffset) + "," + (130) + ")").attr("class", "legendWrapper");
	createLegend(legendWrapper, colorScale, dayScale, joyScale);

	////////////////////////////////////////////////////////////
	////////////// Create month-highlight regions //////////////
	////////////////////////////////////////////////////////////

	var filteredAreaData = [];
	for(var i = 0; i < (monthLineData.length-1); i++) {
		monthAreaData.push([]);
		for(var j = 0; j < monthLineData[i].length; j++) {
			monthAreaData[i].push({x0: monthLineData[i][j].x, x1: monthLineData[i+1][j].x, y: monthLineData[i][j].y });
		}//for j
		filteredAreaData[i] = monthAreaData[i].filter(monthAreaFunction.defined());
	}//for i

	//Create an area between the start and end of a month that lights up on a hover
	monthAreaWrapper.selectAll(".inbetween-month-area")
		.data(filteredAreaData)
		.enter().append("path")
		.attr("class", "inbetween-month-area")
		.attr("d", monthAreaFunction)
		.on("mouseover", function(d,i) {
			d3.select(this)
				.transition().duration(0)
				.style("opacity",1);
			d3.selectAll(".month-area")
				.filter(function(m,k) { return k === i; })
				.transition().duration(0)
				.style("opacity", 1);
		})
		.on("mousemove", function(d,i) {
			//Find the closest year and highlight it
			var mouseY = d3.mouse(this)[1];
			var closestYear = Math.round( yearScale.invert(mouseY) );
			d3.selectAll(".year-title")
				.style("opacity", function(m,j) { return j%3 === 0 ? 1 : 0; })
				.style("fill", null)
				.filter(function(m) { return m === closestYear; })
				.style("opacity", 1)
				.style("fill", "#4c4c4c");

			//Show the month name near the mouse
			hoverWrapper.selectAll(".month-hover")
				.attr("class", "month-hover")
				.attr("x", monthLineData[i][(closestYear-1987)*4].x + (monthLineData[i+1][(closestYear-1987)*4].x - monthLineData[i][(closestYear-1987)*4].x)/2)
				.attr("y", yearScale(closestYear) - monthHeight/2)
				.attr("dy", "0.3em")
				.text( months[i].month )
				.transition().duration(0)
				.style("opacity", 1);
		})
		.on("mouseout", function(d,i) {
			d3.select(this)
				.transition().duration(200)
				.style("opacity",0);
			d3.selectAll(".month-area")
				.filter(function(m,j) { return j === i; })
				.transition().duration(200)
				.style("opacity", 0);

			//Hide the year again (if needed)
			d3.selectAll(".year-title")
				.style("opacity", function(m,j) { return j%3 === 0 ? 1 : 0; })
				.style("fill", null);

			//Hide the month hover
			hoverWrapper.selectAll(".month-hover")
				.transition().duration(200)
				.style("opacity", 0);
		});

	//These will only show the areas within the months themselves, not the region between years
	monthAreaWrapper.selectAll(".month-area")
		.data(monthAreaData)
		.enter().append("path")
		.attr("class", "month-area")
		.attr("d", monthAreaFunction);

	//Create a wrapper for the titles and months
	var hoverWrapper = svg.append("g").attr("class", "hoverWrapper");
	hoverWrapper.append("text")
		.attr("class", "month-hover");
});//csv

////////////////////////////////////////////////////////////
///////////////////// Helper functions /////////////////////
////////////////////////////////////////////////////////////

/*Taken from http://bl.ocks.org/mbostock/7555321
//Wraps SVG text*/
function wrap(text, width) {
  text.each(function() {
	var text = d3.select(this),
		words = text.text().split(/\s+/).reverse(),
		word,
		line = [],
		lineNumber = 0,
		lineHeight = 1.5, // ems
		y = parseFloat(text.attr("y")),
		x = parseFloat(text.attr("x")),
		dy = parseFloat(text.attr("dy")),
		tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

	while (word = words.pop()) {
	  line.push(word);
	  tspan.text(line.join(" "));
	  if (tspan.node().getComputedTextLength() > width) {
		line.pop();
		tspan.text(line.join(" "));
		line = [word];
		tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
	  }
	}
  });
}//wrap	

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}