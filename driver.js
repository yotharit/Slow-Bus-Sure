var sum = 0;
var count = 0;
var currentDate = 0;
var averageMon = 0;
var averageTue = 0;
var averageWed = 0;
var averageThu = 0;
var averageFri = 0;
var averageSat = 0;
var averageSun = 0;
var averageDay = 0;




window.onload = function() {

  var arrayLabel = [0]
  var arraySerie = [0];

  function update(data) {
    arrayLabel.push(getTimeValue());
    arraySerie.push(parseInt(data));

    if (arrayLabel.length >= 20) {
      arrayLabel.splice(0, 1);
      arraySerie.splice(0, 1);
    }

    var input = {
      // A labels array that can contain any sort of values
      labels: arrayLabel,
      // Our series array that contains series objects or in this case series data arrays
      series: [
        arraySerie
      ]

    };
    var options = {
      width: 800,
      height: 300
    };
    new Chartist.Line('.ct-chart', input, options);
    // chart.update(input);
  }

  function getTimeValue() {
    var dateBuffer = new Date();
    var Time = dateBuffer.getHours() + ":" + dateBuffer.getHours() + ":" + dateBuffer.getMinutes();
    return Time;
  }

  // As options we currently only set a static size of 300x200 px. We can also omit this and use aspect ratio containers
  // as you saw in the previous example
  var options = {
    width: 800,
    height: 350
  };
  var input = {
    // A labels array that can contain any sort of values
    labels: arrayLabel,
    // Our series array that contains series objects or in this case series data arrays
    series: [
      arraySerie
    ]
  };
  var count = 100;
  // Create a new line chart object where as first parameter we pass in a selector
  // that is resolving to our chart container element. The Second parameter
  // is the actual data object. As a third parameter we pass in our custom options.
  new Chartist.Line('.ct-chart', input, options);


  setInterval(function() {
    $.ajax({
      url: "http://158.108.165.223/data/kaoyum/velocity/"
    }).done(function(data) {
      console.log(data);
      update(parseInt(data));
    }).fail(function() {
      console.log("FAIL");
    });
  }, 2000);

  var guage = new JustGage({
    id: "bigfella",
    value: 0,
    min: 0,
    max: 90,
    title: "Average Speed",
    label: "KM/HR"
  });

  function findAverage() {
    return sum / count;
  };

  setInterval(function() {
    $.ajax({
      url: "http://158.108.165.223/data/kaoyum/velocity/"
    }).done(function(data) {
      sum += (parseInt(data)*5/18);
      count++;
      averageDay = parseInt(findAverage());
      guage.refresh(averageDay);
    }).fail(function() {
      console.log("FAIL");
    });
  }, 2000);


  function getCurrentDate() {
    var date = new Date();
    return date.getDay();
  }
  currentDate = parseInt(getCurrentDate());

  function checkDailyAverage() {
    switch (parseInt(getCurrentDate())) {
      case 0:
        averageSun = (averageDay + averageSun) / 2;
        break;
      case 1:
        averageMon = (averageDay + averageMon) / 2;
        break;
      case 2:
        averageTue = (averageDay + averageTue) / 2;
        break;
      case 3:
        averageWed = (averageDay + averageWed) / 2;
        break;
      case 4:
        averageThu = (averageDay + averageThu) / 2;
        break;
      case 5:
        averageFri = (averageDay + averageFri) / 2;
        break;
      case 6:
        averageSun = (averageDay + averageSat) / 2;
        break;
      default:
        console.log("ERROR");
        break;
    }
  }


  var weekly = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  var averageDaily = [0, 0, 0, 0, 0, 0, 0];

  var data1 = {
    labels: weekly,
    series: [
      averageDaily
    ]
  };

  var options1 = {
    seriesBarDistance: 15,
    width: 800,
    height: 200
  };

  var responsiveOptions = [
    ['screen and (min-width: 641px) and (max-width: 1024px)', {
      seriesBarDistance: 10,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value;
        }
      }
    }],
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function(value) {
          return value[0];
        }
      }
    }]
  ];

  new Chartist.Bar('.ct-chart1', data1, options1, responsiveOptions);

  setInterval(function() {
    if (currentDate != getCurrentDate) {
      sum = 0;
      count = 0;
      currentDate = parseInt(getCurrentDate());
      console.log(currentDate);
    }
    checkDailyAverage();
    var dataTemp = [averageMon, averageTue, averageWed, averageThu, averageFri, averageSat, averageSun];
    var options1 = {
      seriesBarDistance: 15,
      width: 800,
      height: 200
    };
    var data1 = {
      labels: weekly,
      series: [ dataTemp ]

    };
    var responsiveOptions = [
      ['screen and (min-width: 641px) and (max-width: 1024px)', {
        seriesBarDistance: 10,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value;
          }
        }
      }],
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }]
    ];
    new Chartist.Bar('.ct-chart1', data1, options1, responsiveOptions);
  }, 5000);




}
