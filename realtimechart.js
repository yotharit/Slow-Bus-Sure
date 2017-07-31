window.onload = function () {
	var chart1 = new CanvasJS.Chart("chartContainer1",
	{
		zoomEnabled: true,
		panEnabled: true,
		title:{
			text: "Try Zooming and Panning"
		},
		legend: {
			horizontalAlign: "right",
			verticalAlign: "center"
		},
		axisY:{
			includeZero: false
		},
		data: data,  // random generator below
    });
	chart1.render();
}

	var limit = 1000;    //increase number of dataPoints by increasing this

	var y = 0;
	var data = []; var dataSeries = { type: "line" };
	var dataPoints = [];
	for (var i = 0; i < limit; i += 1) {
		y += (Math.random() * 10 - 5);
		dataPoints.push({
			x: i - limit / 2,
			y: y
		});
	}
	dataSeries.dataPoints = dataPoints;
	data.push(dataSeries);
