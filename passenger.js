window.onload = function() {
  var chart = new CanvasJS.Chart("chartContainer", {

    title: {
      text: "Passenger - Daily Graph",
      fontFamily: "Impact",
      fontWeight: "normal"
    },

    legend: {
      verticalAlign: "bottom",
      horizontalAlign: "center"
    },
    data: [{
      //startAngle: 45,
      indexLabelFontSize: 20,
      indexLabelFontFamily: "Garamond",
      indexLabelFontColor: "darkgrey",
      indexLabelLineColor: "darkgrey",
      indexLabelPlacement: "outside",
      type: "doughnut",
      showInLegend: true,
      dataPoints: [{
          y: 40,
          legendText: "MONDAY 40%",
          indexLabel: "MONDAY 40%"
        },
        {
          y: 12.3,
          legendText: "TUESDAY 12.3%",
          indexLabel: "TUESDAY 12.3%"
        },
        {
          y: 20,
          legendText: "WEDNESDAY 20%",
          indexLabel: "WEDNESDAY 20%"
        },
        {
          y: 12.7,
          legendText: "THURSDAY  12.7%",
          indexLabel: "THURSDAY 12.7%"
        },
        {
          y: 3.2,
          legendText: "FRIDAY 3.2%",
          indexLabel: "FRIDAY 3.2%"
        },
        {
          y: 4.3,
          legendText: "SATURDAY 4.3%",
          indexLabel: "SATURDAY 4.3%"
        },
        {
          y: 7.5,
          legendText: "SUNDAY 7.5%",
          indexLabel: "SUNDAY 7.5%"
        }

      ]
    }]
  });

  chart.render();

  var temp = 0;
  $.ajax({
    url: "http://158.108.165.223/data/kaoyum/test/"
  }).done(function(data) {
    temp = parseInt(data);
  }).fail(function() {
    console.log("FAIL");
  });

  var barChartData = [{
    label: "Series 1",
    values: [{
      time: getTimeValue(),
      y: temp
    }]
  }, ];

  var barChartInstance = $('#barChart').epoch({
    type: 'time.bar',
    axes: ['right', 'bottom', 'left'],
    data: barChartData
  });

  function getTimeValue() {
    var dateBuffer = new Date();
    var Time = dateBuffer.getTime();
    return Time;
  }

  function getRandomValue() {
    var randomValue = Math.random() * 100;
    return randomValue;
  }

  function updateGraph(data) {
    var newBarChartData = [{
      time: getTimeValue(),
      y: data
    }];
    barChartInstance.push(newBarChartData);
  }
  setInterval(function() {
    $.ajax({
      url: "http://158.108.165.223/data/kaoyum/test/"
    }).done(function(data) {
      updateGraph(parseInt(data));
    }).fail(function() {
      console.log("FAIL");
    });
  }, 1000);

  var data = {
    // A labels array that can contain any sort of values
    labels: ['3.00-4.00', '4.00-5.00','5.00-6.00', '6.00-7.00', '7.00-8.00','8.00-9.00', '9.00-10.00','10.00-11.00', '11.00-12.00', '12.00-13.00',
    '13.00-14.00','14.00-15.00', '15.00-16.00','16.00-17.00', '17.00-18.00', '18.00-19.00' ,'19.00-20.00', '20.00-21.00','21,00-22.00','22.00-23.00','23.00-0.00'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
      [232,525,223,923,325,932,909,1325,1325,1233,1234,1234,1533,1233,2500,2000,990,700,500,300,100]
    ]
  };

  // As options we currently only set a static size of 300x200 px. We can also omit this and use aspect ratio containers
  // as you saw in the previous example
  var options = {
    width: 650,
    height: 200
  };

  // Create a new line chart object where as first parameter we pass in a selector
  // that is resolving to our chart container element. The Second parameter
  // is the actual data object. As a third parameter we pass in our custom options.
  var lineChart = new Chartist.Line('.ct-chart', data, options);

  setInterval(function(){
    var data = {
      // A labels array that can contain any sort of values
      labels: ['3.00-4.00', '4.00-5.00','5.00-6.00', '6.00-7.00', '7.00-8.00','8.00-9.00', '9.00-10.00','10.00-11.00', '11.00-12.00', '12.00-13.00',
      '13.00-14.00','14.00-15.00', '15.00-16.00','16.00-17.00', '17.00-18.00', '18.00-19.00' ,'19.00-20.00', '20.00-21.00','21,00-22.00','22.00-23.00','23.00-0.00'],
      // Our series array that contains series objects or in this case series data arrays
      series: [
        [Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),
        Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),
      Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),
    Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),
  Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),Math.floor(Math.random()*2000),
Math.floor(Math.random()*2000)]
      ]
    };
    lineChart.update(data);
  },1000);



}
