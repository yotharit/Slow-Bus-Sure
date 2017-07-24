$(document).ready(function() {
    var link = "http://158.108.165.223/data/kaoyum/seat/"

    $('#seat13').click(function(){
      if(seat1===0){
        seat1++;
      }
      document.getElementById("seat13").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"

    });
    $('#bell').click(function(){
      document.getElementById("bell").innerHTML = "<img src='images/bellDingDing.png' style='width:200px;height:240px'>"
    });

});
