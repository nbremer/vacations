function createAnnotations(titleWrapper, monthLineData, dayStartScale, dayScale, emptyPerc, yearScale, monthLineHeight, xOffset) {

	////////////////////////////////////////////////////////////
	//////////////////// Create annotations ////////////////////
	////////////////////////////////////////////////////////////

	//Born
	var bornAnnotation = titleWrapper.append("g").attr("transform","translate(" + (monthLineData[0][0].x + dayStartScale(16) * emptyPerc) + "," + yearScale(1987) + ")");
	bornAnnotation.append("path")
		.attr("d", "M 0.000 5.000 L 5.290 7.281 L 4.755 1.545 L 8.560 -2.781 L 2.939 -4.045 L 0.000 -9.000 L -2.939 -4.045 L -8.560 -2.781 L -4.755 1.545 L -5.290 7.281 L 0.000 5.000")
		.style("fill", "#EFB605");
	bornAnnotation.append("line")
		.attr("class", "annotation-line")
		.attr("x1", 0)
		.attr("y1", 12)
		.attr("x2", 0)
		.attr("y2", monthLineHeight/2 * 0.8);
	bornAnnotation.append("text")
		.attr("class", "annotation-text")
		.attr("x", 0)
		.attr("y", monthLineHeight/2 * 0.9)
		.attr("dy", "0.75em")
		.text("Born on January 19th, 1987")

	//Parents split up
	var parentsAnnotation = titleWrapper.append("g").attr("transform","translate(" + (monthLineData[5][(2001-1987)*4].x + dayStartScale(15) * emptyPerc) + "," + yearScale(2001) + ")");
	parentsAnnotation.append("path")
		.attr("transform", "scale(" + 0.5 + ")translate(-15,-30)")
		.attr("d", "M15 3 Q16.5 6.8 25 18 A12.8 12.8 0 1 1 5 18 Q13.5 6.8 15 3z")
		.style("fill", "#1D7EB0");
	parentsAnnotation.append("line")
		.attr("class", "annotation-line")
		.attr("x1", 0)
		.attr("y1", 12)
		.attr("x2", 0)
		.attr("y2", monthLineHeight/2 * 0.8);
	parentsAnnotation.append("text")
		.attr("class", "annotation-text")
		.attr("x", 0)
		.attr("y", monthLineHeight/2 * 0.9)
		.attr("dy", "0.75em")
		.text("Parents split up");

	//With Ralph
	var ralphAnnotation = titleWrapper.append("g").attr("transform","translate(" + (monthLineData[0][(2004-1987)*4].x + dayStartScale(19) * emptyPerc) + "," + yearScale(2004) + ")");
	ralphAnnotation.append("path")
		.attr("transform", "scale(" + 0.9 + ")translate(-10,-10)")
		.attr("d", "M5.7.08C.08,0-5.11,8.76,10,17.87a.06.06,0,0,1,.1,0C25.76,8.47,19.71-.59,13.91.12a4.54,4.54,0,0,0-3.83,2.61A4.54,4.54,0,0,0,6.24.12L5.7.08h0Z")
		.style("fill", "#B70B6E");
	ralphAnnotation.append("line")
		.attr("class", "annotation-line")
		.attr("x1", 0)
		.attr("y1", 13)
		.attr("x2", 0)
		.attr("y2", monthLineHeight/2 * 0.8);
	ralphAnnotation.append("text")
		.attr("class", "annotation-text")
		.attr("x", 0)
		.attr("y", monthLineHeight/2 * 0.9)
		.attr("dy", "0.75em")
		.text("Together with Ralph");

	//Started studying
	var studyAnnotation = titleWrapper.append("g").attr("transform","translate(" + (monthLineData[8][(2005-1987)*4].x + dayStartScale(9) * emptyPerc) + "," + yearScale(2005) + ")");
	studyAnnotation.append("path")
		.attr("d", "M 0.000 5.000 L 5.290 7.281 L 4.755 1.545 L 8.560 -2.781 L 2.939 -4.045 L 0.000 -9.000 L -2.939 -4.045 L -8.560 -2.781 L -4.755 1.545 L -5.290 7.281 L 0.000 5.000")
		.style("fill", "#EFB605");
	studyAnnotation.append("line")
		.attr("class", "annotation-line")
		.attr("x1", 0)
		.attr("y1", -12)
		.attr("x2", 0)
		.attr("y2", -monthLineHeight/2 * 0.8);
	studyAnnotation.append("text")
		.attr("class", "annotation-text")
		.attr("x", -3)
		.attr("y", -monthLineHeight/2 * 0.9)
		.attr("dy", "-0.1em")
		.style("text-anchor", "start")
		.text("Started studying Astronomy");

	//Living in SF for 6 months
	var abroadAnnotation2010 = titleWrapper.append("g").attr("transform","translate(" + (monthLineData[7][(2010-1987)*4].x + dayStartScale(3) * emptyPerc) + "," + yearScale(2010) + ")");	
	abroadAnnotation2010.append("rect")
		.attr("class", "annotation-sf-rect")
		.attr("x", 0)
		.attr("y", -4)
		.attr("width", dayScale(31 - 3)*emptyPerc + dayScale(30) + dayScale(31) + dayScale(30)*emptyPerc + dayScale(31)*emptyPerc)
		.attr("height", 8);
	abroadAnnotation2010.append("line")
		.attr("class", "annotation-line")
		.attr("x1", dayScale(31 - 3)*emptyPerc + dayScale(30) + dayScale(26) )
		.attr("y1", -18)
		.attr("x2", dayScale(31 - 3)*emptyPerc + dayScale(30) + dayScale(26) )
		.attr("y2", -monthLineHeight/2 * 1.15);
	abroadAnnotation2010.append("text")
		.attr("class", "annotation-text")
		.attr("x", dayScale(31 - 3)*emptyPerc + dayScale(30) + dayScale(26) )
		.attr("y", -monthLineHeight/2 * 1.35)
		.attr("dy", "-0.1em")
		.text("Living in the Bay Area");
	//Add Golden Gate Bridge Icon
	var scale = 1.4;
	abroadAnnotation2010.append("path")
		.attr("class", "annotation-golden-gate-line")
		.attr("transform", "translate(" + (dayScale(31 - 3)*emptyPerc + dayScale(30) + dayScale(26)) + ",-10)scale(" + scale + ")translate(-15,-5)")
		.attr("d", "M9.52,8.74V1.26C9,7,3.33,6.61,1.42,6.61H28.58c-1.83,0-7.93,0-8-5.35")
		.style("stroke-width", 1.5 / scale );
	abroadAnnotation2010.append("path")
		.attr("class", "annotation-golden-gate-line")
		.attr("transform", "translate(" + (dayScale(31 - 3)*emptyPerc + dayScale(30) + dayScale(26)) + ",-10)scale(" + scale + ")translate(-15,-5)")
		.attr("d", "M20.55,8.74V1.26a5.55,5.55,0,0,1-11.1,0")
		.style("stroke-width", 1.5 / scale);
	//And the small section for 2011
	var abroadAnnotation2011 = titleWrapper.append("g").attr("transform","translate(" + (monthLineData[0][(2011-1987)*4].x + dayStartScale(1) * emptyPerc) + "," + yearScale(2011) + ")");
	abroadAnnotation2011.append("rect")
		.attr("class", "annotation-sf-rect")
		.attr("x", 0)
		.attr("y", -4)
		.attr("width", dayScale(12))
		.attr("height", 8);

	//Started working
	var workAnnotation = titleWrapper.append("g").attr("transform","translate(" + (monthLineData[9][(2011-1987)*4].x + dayStartScale(1) * emptyPerc) + "," + yearScale(2011) + ")");
	workAnnotation.append("path")
		.attr("transform", "scale(" + 0.9 + ")translate(-10,-10)")
		.attr("d", "M7.14,2.86h5.71V1.43H7.14ZM20,10v5.36a1.79,1.79,0,0,1-1.79,1.79H1.79a1.72,1.72,0,0,1-1.26-.52A1.72,1.72,0,0,1,0,15.36V10H7.5v1.79a.72.72,0,0,0,.71.71h3.57a.72.72,0,0,0,.71-.71V10Zm-8.57,0v1.43H8.57V10ZM20,4.64V8.93H0V4.64A1.72,1.72,0,0,1,.52,3.38a1.72,1.72,0,0,1,1.26-.52H5.71V1.07A1,1,0,0,1,6,.31,1,1,0,0,1,6.79,0h6.43A1,1,0,0,1,14,.31a1,1,0,0,1,.31.76V2.86h3.93A1.79,1.79,0,0,1,20,4.64Z")
		.style("fill", "#10A66E");
	workAnnotation.append("line")
		.attr("class", "annotation-line")
		.attr("x1", 0)
		.attr("y1", 12)
		.attr("x2", 0)
		.attr("y2", monthLineHeight/2 * 0.8);
	workAnnotation.append("text")
		.attr("class", "annotation-text")
		.attr("x", 0)
		.attr("y", monthLineHeight/2 * 0.9)
		.attr("dy", "0.75em")
		.text("Started working");

	//Today
	var todayAnnotation = titleWrapper.append("g").attr("transform","translate(" + (monthLineData[8][(2016-1987)*4].x + dayStartScale(26) * emptyPerc) + "," + yearScale(2016) + ")");
	todayAnnotation.append("path")
		.attr("d", "M 0.000 5.000 L 5.290 7.281 L 4.755 1.545 L 8.560 -2.781 L 2.939 -4.045 L 0.000 -9.000 L -2.939 -4.045 L -8.560 -2.781 L -4.755 1.545 L -5.290 7.281 L 0.000 5.000")
		.style("fill", "#EFB605");
	todayAnnotation.append("line")
		.attr("class", "annotation-line")
		.attr("x1", 0)
		.attr("y1", -12)
		.attr("x2", 0)
		.attr("y2", -monthLineHeight/2 * 0.8);
	todayAnnotation.append("text")
		.attr("class", "annotation-text")
		.attr("x", -3)
		.attr("y", -monthLineHeight/2 * 0.9)
		.attr("dy", "-0.1em")
		.text("Finished this visual!");

	////////////////////////////////////////////////////////////
	/////////////////////// Intro text /////////////////////////
	////////////////////////////////////////////////////////////

	var introWrapper = titleWrapper.append("g").attr("transform", "translate(" + (xOffset) + "," + (-100) + ")").attr("class", "introWrapper");
	introWrapper.append("text")
		.attr("class", "title")
		.attr("x", 0)
		.attr("y", 0)
		.attr("dy", "0.35em")
		.text("My life in vacations");

		introWrapper.append("text")
		.attr("class", "intro-text")
		.attr("x", 0)
		.attr("y", 45)
		.attr("dy", "0.35em")
		.text("For this month's datasketches' topic of Travel I wanted to dive into something very personal to me, my vacations. Seeing the wonders of the world is one of my greatest hobbies (besides visualizing data), so I was interested to unearth & understand patterns and trends in the 30 years since my birth that I was not yet aware of. Scroll down if you'd like to get to know me through my travels ^_^")
		.call(wrap, 360);

	var squishedWrapper = titleWrapper.append("g").attr("transform", "translate(" + (180) + "," + (-50) + ")").attr("class", "dataWrapper");
		//Add the color title
	squishedWrapper.append("text")
		.attr("class", "annotation-sub-title")
		.attr("x", 0)
		.attr("y", 0)
		.attr("dy", "0.35em")
		.text("Squeezed months");	
	squishedWrapper.append("text")
		.attr("class", "intro-text")
		.attr("x", 0)
		.attr("y", 30)
		.attr("dy", "0.35em")
		.text("I want this visual to focus on my vacations. However, I'm only on vacation for about 5 weeks, thus about 10%, of the year. Giving all the months an equal width would then result in a visual that's too wide. Therefore, I've squeezed down all months in which I wasn't on vacation for a single day. This does make it more difficult to compare dates across years, but my main focus is on the vacations themselves and less on the exact months.")
		.call(wrap, 310);

	var dataWrapper = titleWrapper.append("g").attr("transform", "translate(" + (270) + "," + (yearScale(1997)) + ")").attr("class", "dataWrapper");
		//Add the color title
	dataWrapper.append("text")
		.attr("class", "annotation-sub-title")
		.attr("x", 0)
		.attr("y", 0)
		.attr("dy", "0.35em")
		.text("Data collection");	
	dataWrapper.append("text")
		.attr("class", "intro-text")
		.attr("x", 0)
		.attr("y", 30)
		.attr("dy", "0.35em")
		.text("The focus was on the (very manual) collection of the data. Since the digital camera has become affordable at the start of the 2000's it's become much easier to look back and reconstruct when and where you went on vacation. However, for the vacations before the 2000's I asked the help of my parents and went through all of my old childhood photos to try and reconstruct the vacations that I went on during the first 10 years of my life. That was a nice trip down memory lane. The location per year was easy to find, but getting the exact dates proved impossible")
		.call(wrap, 240);

	//After my parents split up
	var splitWrapper = titleWrapper.append("g").attr("transform", "translate(" + (xOffset) + "," + (yearScale(2002)) + ")").attr("class", "splitWrapper");
	splitWrapper.append("text")
		.attr("class", "intro-text")
		.attr("x", 0)
		.attr("y", 0)
		.attr("dy", "0.35em")
		.text("After my parents split up, me and my dad started to go on culture and nature oriented vacations, starting with Paris in 2001. It's here that I learned how much I love going out and seeing what the world has to offer")
		.call(wrap, 270);
	
	//Trying snow vacations
	var snowWrapper = titleWrapper.append("g").attr("transform", "translate(" + (xOffset) + "," + (yearScale(2005)) + ")").attr("class", "snowWrapper");
	snowWrapper.append("text")
		.attr("class", "intro-text")
		.attr("x", 0)
		.attr("y", 0)
		.attr("dy", "-0.4em")
		.text("Tried out snowboarding during 2 separate weeks this year. Never again...")
		.call(wrap, 230);

	//Living in SF
	var abroadWrapper = titleWrapper.append("g").attr("transform", "translate(" + (xOffset) + "," + (yearScale(2010)) + ")").attr("class", "abroadWrapper");
	abroadWrapper.append("text")
		.attr("class", "intro-text")
		.attr("x", 0)
		.attr("y", 0)
		.attr("dy", "0.35em")
		.text("During the 6 months that Ralph & I lived in the Bay Area (for internship & study) we went out to explore the region practically every weekend. However, there were only 4 trips where we stayed overnight in a hotel")
		.call(wrap, 300);

	//Olympic Games
	var olympicsWrapper = titleWrapper.append("g").attr("transform", "translate(" + (xOffset) + "," + (yearScale(2012)) + ")").attr("class", "olympicsWrapper");
	olympicsWrapper.append("text")
		.attr("class", "intro-text")
		.attr("x", 0)
		.attr("y", 0)
		.attr("dy", "-0.8em")
		.text("I've always loved the Olympics, so with the 2012 games so near to Amsterdam I went for a few days with my dad. Fantastic experience")
		.call(wrap, 300);

	//10 years together
	var decadeWrapper = titleWrapper.append("g").attr("transform", "translate(" + (xOffset) + "," + (yearScale(2014)) + ")").attr("class", "decadeWrapper");
	decadeWrapper.append("text")
		.attr("class", "intro-text")
		.attr("x", 0)
		.attr("y", 0)
		.attr("dy", "-1.75em")
		.text("Celebrating 10 years together we went on a 'Northern Lights' themed week to the North of Finland. Facing far below freezing temperatures, dog sledding, ice climbing & even some aurora's. One of our best vacations ever")
		.call(wrap, 270);

}//createAnnotations