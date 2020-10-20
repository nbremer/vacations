////////////////////////////////////////////////////////////
/////////////////// Create people icons ////////////////////
////////////////////////////////////////////////////////////

function createRalphIcon(wrapper, height, iconLoc, size) {

	//Heart is 20px wide
	var width = size ? size : 9;
	var scale = width / 20;

	//Heart
	wrapper.append("path")
		.attr("class", "ralph-icon")	
		.attr("transform", "translate(" + iconLoc + "," + height + ")scale(" + scale + ")translate(0," + (-24) + ")")
		.attr("d", "M5.7.08C.08,0-5.11,8.76,10,17.87a.06.06,0,0,1,.1,0C25.76,8.47,19.71-.59,13.91.12a4.54,4.54,0,0,0-3.83,2.61A4.54,4.54,0,0,0,6.24.12L5.7.08h0Z");

	return iconLoc + width + 1;
}//createRalphIcon

function createFatherIcon(wrapper, height, iconLoc, size) {

	var radius = size ? size : 4;
	wrapper.append("circle")
		.attr("class", "father-icon")	
		.attr("transform", "translate(" + (iconLoc + radius * 1.5) + "," + (height - 7) + ")")
		.attr("r", radius);

	return iconLoc + radius * 2.5;
}//createFatherIcon

function createMotherIcon(wrapper, height, iconLoc, size) {

	//Mother icon is 15px wide and 18 px high
	var width = size ? size : 9;
	var scale = width / 15;

	var motherWrapper = wrapper.append("g")
		.attr("transform", "translate(" + (iconLoc) + "," + (height - 12) + ")scale(" + scale + ")");

	motherWrapper.append("circle")
		.attr("class", "mother-icon mother-circle")
		.attr("cx", 7.6)
		.attr("cy", 5)
		.attr("r", 4.6);

	motherWrapper.append("path")
		.attr("class", "mother-icon mother-line")
		.style("stroke-width", 1.75 / scale)
		.attr("d", "M12.33,16.5S6.49,17.71,11,6.58c.89-2.83-2-4.91-3.52-4.91");

	return iconLoc + width;

}//createMotherIcon

function createInlawsIcon(wrapper, height, iconLoc, size) {

	var radius = size ? size : 3;
	wrapper.append("circle")
		.attr("class", "inlaws-icon")	
		.attr("transform", "translate(" + (iconLoc + radius * 1.5) + "," + (height - 7) + ")")
		.attr("r", radius);

	return iconLoc + radius * 2.5;

}//createInlawsIcon

function createOtherIcon(wrapper, height, iconLoc, size) {

	var radius = size ? size : 2;
	wrapper.append("circle")
		.attr("class", "other-icon")	
		.attr("transform", "translate(" + (iconLoc + radius * 2) + "," + (height - 7) + ")")
		.attr("r", radius);

	return iconLoc + radius * 2.5;
}//createOtherIcon