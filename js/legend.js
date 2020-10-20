function createLegend(legendWrapper, colorScale, dayScale, joyScale) {

	//Add the title
	legendWrapper.append("text")
		.attr("class", "legend-title")
		.attr("x", 0)
		.attr("y", 0)
		.attr("dy", "0.35em")
		.text("Decoding the visual");

	/////////////////////// Color //////////////////////////

	var legendColorWrapper = legendWrapper.append("g").attr("transform", "translate(" + 0 + "," + (45) + ")").attr("class", "legendColorWrapper");

	//Add the color title
	legendColorWrapper.append("text")
		.attr("class", "legend-sub-title")
		.attr("x", 0)
		.attr("y", 0)
		.attr("dy", "0.35em")
		.text("Destination");	

	var rectSize = 16, //dimensions of the colored square
		rowHeight = 22; //height of a row in the legend

	//Create container per rect/text pair  
	var legendColor = legendColorWrapper.selectAll(".legend-color-group")  	
			  .data(colorScale.range())                              
			  .enter().append("g")   
			  .attr("class", "legend-color-group") 
			  .attr("transform", function(d,i) { return "translate(" + (i >= 5 ? 135 : 15) + "," + (20 + i%5 * rowHeight) + ")"; });
	//Append small squares to Legend
	legendColor.append("rect") 
		.attr("class", "legend-text")                                    
		.attr("width", rectSize) 
		.attr("height", rectSize) 			  		  
		.style("fill", function(d) { return d; });                                 
	//Append text to Legend
	legendColor.append("text")                                     
		.attr("transform", "translate(" + 25 + "," + (rectSize/2) + ")")
		.attr("class", "legend-text")
		.attr("dy", ".35em")		  
		.text(function(d,i) { 
		  	var country = colorScale.domain()[i] === "usa" ? "USA" : colorScale.domain()[i];
		  	return capitalizeFirstLetter(country); 
		});  

	/////////////////////// Purpose //////////////////////////

	var legendPurposeWrapper = legendWrapper.append("g").attr("transform", "translate(" + 15 + "," + (210) + ")").attr("class", "legendPurposeWrapper");

	//Add the color title
	legendPurposeWrapper.append("text")
		.attr("class", "legend-sub-title")
		.attr("x", -15)
		.attr("y", 0)
		.attr("dy", "0.35em")
		.text("Purpose");	

	legendPurposeWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", 0)
		.attr("y", 125)
		.attr("dy", ".35em")		  
		.text("I leave it up to you to figure out the symbols for a safari, Disneyland visits & the going to the Olympics")
		.call(wrap, 168); 

	var culturePatternWrapper = legendPurposeWrapper.append("g").attr("transform", "translate(" + 2.5 + "," + (40) + ")").attr("class","culture-pattern");
	createCulturePattern(culturePatternWrapper, 70, 40);
	culturePatternWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", 80)
		.attr("dy", ".35em")		  
		.text("Cities & culture"); 

	var naturePatternWrapper = legendPurposeWrapper.append("g").attr("transform", "translate(" + 2.5 + "," + (90) + ")").attr("class","nature-pattern");
	createNaturePattern(naturePatternWrapper, 70, 40);
	naturePatternWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", 80)
		.attr("dy", ".35em")		  
		.text("Nature & hiking"); 

	var sunPatternWrapper = legendPurposeWrapper.append("g").attr("transform", "translate(" + 190 + "," + (40) + ")").attr("class","sun-pattern");
	createSunPattern(sunPatternWrapper, 40, 40);
	sunPatternWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", 50)
		.attr("dy", ".35em")		  
		.text("Sunshine & relaxing"); 

	var snowPatternWrapper = legendPurposeWrapper.append("g").attr("transform", "translate(" + 190 + "," + (90) + ")").attr("class","snow-pattern");
	createSnowPattern(snowPatternWrapper, 40, 40);
	snowPatternWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", 50)
		.attr("dy", ".35em")		  
		.text("Snow"); 

	var christmasPatternWrapper = legendPurposeWrapper.append("g").attr("transform", "translate(" + 193 + "," + (140) + ")").attr("class","christmas-pattern");
	createChristmasPattern(christmasPatternWrapper, 34, 40);
	christmasPatternWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", 47)
		.attr("dy", ".35em")		  
		.text("Christmas getaway"); 

	/////////////////////// People //////////////////////////

	var legendPeopleWrapper = legendWrapper.append("g").attr("transform", "translate(" + 15 + "," + (455) + ")").attr("class", "legendPeopleWrapper");

	var iconSpacing = 60;

	//Add the color title
	legendPeopleWrapper.append("text")
		.attr("class", "legend-sub-title")
		.attr("x", -15)
		.attr("y", -35)
		.attr("dy", "0.35em")
		.text("Travel companions");

	var ralphIconWrapper = legendPeopleWrapper.append("g").attr("transform", "translate(" + (2.5) + "," + (0) + ")").attr("class","ralph-icon-wrapper");
	createRalphIcon(ralphIconWrapper, 15, 5, 18);
	ralphIconWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", 0)
		.attr("y", 22)
		.attr("dy", ".35em")		  
		.text("Ralph"); 

	var fatherIconWrapper = legendPeopleWrapper.append("g").attr("transform", "translate(" + (2.5 + 1*iconSpacing) + "," + (0) + ")").attr("class","father-icon-wrapper");
	createFatherIcon(fatherIconWrapper, 9, 2, 8);
	fatherIconWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", 0)
		.attr("y", 22)
		.attr("dy", ".35em")		  
		.text("father"); 

	var motherIconWrapper = legendPeopleWrapper.append("g").attr("transform", "translate(" + (2.5 + 2*iconSpacing) + "," + (0) + ")").attr("class","mother-icon-wrapper");
	createMotherIcon(motherIconWrapper, 5, 6, 18);
	motherIconWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", 0)
		.attr("y", 22)
		.attr("dy", ".35em")		  
		.text("mother");
	d3.select(".legendWrapper .mother-icon-wrapper .mother-line").style("stroke-width", 1.75);

	var inlawsIconWrapper = legendPeopleWrapper.append("g").attr("transform", "translate(" + (2.5 + 3*iconSpacing) + "," + (0) + ")").attr("class","inlaws-icon-wrapper");
	createInlawsIcon(inlawsIconWrapper, 9, 4, 7);
	inlawsIconWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", 0)
		.attr("y", 22)
		.attr("dy", ".35em")		  
		.text("inlaws");
	d3.select(".legendWrapper .inlaws-icon-wrapper .inlaws-icon").style("stroke-width", 4);

	var otherIconWrapper = legendPeopleWrapper.append("g").attr("transform", "translate(" + (2.5 + 4*iconSpacing) + "," + (0) + ")").attr("class","other-icon-wrapper");
	createOtherIcon(otherIconWrapper, 9, 8, 3.5);
	otherIconWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", 0)
		.attr("y", 22)
		.attr("dy", ".35em")		  
		.text("others");

	/////////////////////// Length //////////////////////////

	var legendLengthWrapper = legendWrapper.append("g").attr("transform", "translate(" + 15 + "," + (530) + ")").attr("class", "legendLengthWrapper");

	//Add the color title
	legendLengthWrapper.append("text")
		.attr("class", "legend-sub-title")
		.attr("x", -15)
		.attr("y", 0)
		.attr("dy", "0.35em")
		.text("Duration");

	var lengthRectHeight = joyScale(6),
		legendRectStart = 25,
		legendRectWidth = dayScale(20);
	//Add rectangle for exact dates
	legendLengthWrapper.append("rect")
		.attr("class", "legend-length-rect")
		.attr("x", 0)
		.attr("y", legendRectStart)
		.attr("width", legendRectWidth)
		.attr("height", lengthRectHeight)
		.style("fill", colorScale("netherlands") );
	legendLengthWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", legendRectWidth/2)
		.attr("y", legendRectStart + lengthRectHeight + 10)
		.attr("dy", ".35em")
		.style("text-anchor", "middle")		  
		.text("Dates known exactly");
	//Add rectangle for unknown length
	var unknownLengthOffset = 160;
	legendLengthWrapper.append("rect")
		.attr("class", "legend-length-rect")
		.attr("x", unknownLengthOffset)
		.attr("y", legendRectStart)
		.attr("width", legendRectWidth)
		.attr("height", lengthRectHeight)
		.style("filter", "url(#horizontal-blur-filter)")
		.style("fill", colorScale("netherlands") );
	legendLengthWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", unknownLengthOffset + legendRectWidth/2)
		.attr("y", legendRectStart + lengthRectHeight + 10)
		.attr("dy", ".35em")
		.style("text-anchor", "middle")		  
		.text("Dates vaguely known");

	/////////////////////// Enjoyment //////////////////////////

	var legendEnjoymenthWrapper = legendWrapper.append("g").attr("transform", "translate(" + 15 + "," + (640) + ")").attr("class", "legendEnjoymentWrapper");

	//Add the color title
	legendEnjoymenthWrapper.append("text")
		.attr("class", "legend-sub-title")
		.attr("x", -15)
		.attr("y", 0)
		.attr("dy", "0.35em")
		.text("Enjoyment");

	var legendRectStart = 60,
		legendRectWidth = dayScale(10),
		nextRectOffset = 100,
		chosenJoyColor = "carribean";
	//Add rectangle for little fun
	legendEnjoymenthWrapper.append("rect")
		.attr("class", "legend-joy-rect")
		.attr("x", 0)
		.attr("y", legendRectStart - joyScale(5)/2)
		.attr("width", legendRectWidth)
		.attr("height", joyScale(5))
		.style("fill", colorScale(chosenJoyColor) );
	legendEnjoymenthWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", legendRectWidth/2)
		.attr("y", legendRectStart + joyScale(5)/2 + 10)
		.attr("dy", ".35em")
		.style("text-anchor", "middle")		  
		.text("Not much fun");

	//Add rectangle for unknown fun
	var unknownJoyScale = joyScale(7);
	legendEnjoymenthWrapper.append("rect")
		.attr("class", "legend-joy-rect")
		.attr("x", 1*nextRectOffset)
		.attr("y", legendRectStart - unknownJoyScale/2)
		.attr("width", legendRectWidth)
		.attr("height", unknownJoyScale)
		.style("filter", "url(#vertical-blur-filter)")
		.style("fill", colorScale(chosenJoyColor) );
	legendEnjoymenthWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", 1*nextRectOffset + legendRectWidth/2)
		.attr("y", legendRectStart + unknownJoyScale/2 + 15)
		.attr("dy", ".35em")
		.style("text-anchor", "middle")		  
		.text("Don't know");

	//Add rectangle for much fun
	legendEnjoymenthWrapper.append("rect")
		.attr("class", "legend-joy-rect")
		.attr("x", 2*nextRectOffset)
		.attr("y", legendRectStart - joyScale(10)/2)
		.attr("width", legendRectWidth)
		.attr("height", joyScale(10))
		.style("fill", colorScale(chosenJoyColor) );
	legendEnjoymenthWrapper.append("text")
		.attr("class", "legend-text")
		.attr("x", 2*nextRectOffset + legendRectWidth/2)
		.attr("y", legendRectStart + joyScale(10)/2 + 10)
		.attr("dy", ".35em")
		.style("text-anchor", "middle")		  
		.text("Freakin' amazing");

}//createLegend