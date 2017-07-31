var currentstation = 1;
var people;
var sta1Count = 0;
var sta2Count = 0;
var sta3Count = 0;
window.onload = function() {
  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var bus = document.getElementById("bus");



  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  bus.onclick = function() {
    $.ajax({
      url: "http://158.108.165.223/data/kaoyum/people"
    }).done(function(data) {
      var temp = parseInt(data)+ 4;
      var word = "There are " + temp + " people on the bus now.";
      document.getElementById("text").innerHTML = word;
    })
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  setInterval(function(){
    var x = Math.floor(Math.random()*10);
    if(x  <= 3){
      document.getElementById("stop1").innerHTML =
      "<img type='image' src='green.png' name='image' width='60' height='60''>"
      console.log("stop11");;
    }
    else if(x>7){
      document.getElementById("stop1").innerHTML =
      "<img type='image' src='red.png' name='image' width='60' height='60''>";
      console.log("stop12");;
    }
    else {
      document.getElementById("stop1").innerHTML =
      "<img type='image' src='yellow.png' name='image' width='60' height='60''>";
      console.log("stop13");;

    }
  },1000);
  setInterval(function(){
    var x = Math.floor(Math.random()*10);
    if(x  <= 3){
      document.getElementById("stop2").innerHTML =
      "<img type='image' src='green.png' name='image' width='60' height='60''>";
      console.log("stop21");;

    }
    else if(x>7){
      document.getElementById("stop2").innerHTML =
      "<img type='image' src='red.png' name='image' width='60' height='60''>";
      console.log("stop22");;

    }
    else {
      document.getElementById("stop2").innerHTML =
      "<img type='image' src='yellow.png' name='image' width='60' height='60''>";
      console.log("stop23");;

    }
  },1000);
  setInterval(function(){
    var x = Math.floor(Math.random()*10);
    if(x  <= 3){
      document.getElementById("stop3").innerHTML =
      "<img type='image' src='green.png' name='image' width='60' height='60''>";
      console.log("stop31");;

    }
    else if(x>7){
      document.getElementById("stop3").innerHTML =
      "<img type='image' src='red.png' name='image' width='60' height='60''>";
      console.log("stop32");;

    }
    else {
      document.getElementById("stop3").innerHTML =
      "<img type='image' src='yellow.png' name='image' width='60' height='60''>";
      console.log("stop33");;

    }
  },1000);


  var pieData = [
    { label: 'Station1', value: 10 },
    { label: 'Station2', value: 20 },
    { label: 'Station3', value: 40 },
  ]

  var pieChart = $('#pie').epoch({
    type: 'pie',
    data: pieData
  });

  setInterval(function(){
    sta1Count += Math.floor(Math.random()*100);
    sta2Count += Math.floor(Math.random()*100);
    sta3Count += Math.floor(Math.random()*100);

    var pieData = [
      { label: 'Station1', value: sta1Count },
      { label: 'Station2', value: sta2Count },
      { label: 'Station3', value: sta3Count },
    ]

    pieChart.update(pieData);


  },1000);



}
