var link = "http://158.108.165.223/data/kaoyum/"
var ring = 0;
var seat1 = 0;
var seat2 = 0;
var seat3 = 0;
var seat4 = 0;
var door = 0;
var pill1 = 0;
var pillar = 0;
var pill3 = 0;
var pos = 0;
var people = 8;
var manySit = 8;

var valeur=66.64;

// document.getElementById("animate").innerHTML ="panther"
// console.log(());
// setInterval(frame, 5);
//
// function frame() {
//   if (pos == 300) {
//     pos = 0;
//      elem.style.right = pos + 'px';
//     elem.style.left = pos + 'px';
//     pos++;
//   } else {
//     pos++;
//     elem.style.right = pos + 'px';
//     elem.style.left = pos + 'px';
//   }
// }

$(document).ready(function() {

    $('#seatBar').css('width', valeur+'%').attr('aria-valuenow', valeur);

    $("#manyPeople").text("8 Peoples in the car");
    // $("#manyPeople").css("left") = '0px';
    if (seat1 === 0) {
        document.getElementById("seat21").innerHTML = "<img src='images/seatAvi.png' style='width:200px;height:170px'>"
    } else {
        document.getElementById("seat21").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"
    }
    if (seat2 === 0) {
        document.getElementById("seat22").innerHTML = "<img src='images/seatAvi.png' style='width:200px;height:170px'>"
    } else {
        document.getElementById("seat22").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"
    }
    if (seat3 === 0) {
        document.getElementById("seat23").innerHTML = "<img src='images/seatAvi.png' style='width:200px;height:170px'>"
    } else {
        document.getElementById("seat23").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"
    }
    if (seat4 === 0) {
        document.getElementById("seat24").innerHTML = "<img src='images/seatAvi.png' style='width:200px;height:170px'>"
    } else {
        document.getElementById("seat24").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"
    }
    if (door === 0) {
        document.getElementById("door").innerHTML = "<img src='images/opened.png' style='width:330px;height:300px'>"
    } else {
        document.getElementById("door").innerHTML = "<img src='images/closed.png' style='width:330px;height:300px'>"
    }

    $('#pillar1').click(function() {
        if (pill1 === 0) {
            pill1++;
            document.getElementById("pillar1").innerHTML = "<img src='images/pillarFull.png' style='width:200px;height:240px'>"
        } else {
            pill1--;
            document.getElementById("pillar1").innerHTML = "<img src='images/pillar.png' style='width:200px;height:240px'>"
        }
    });
    $('#pillar2').click(function() {
        if (pillar === 0) {
            pill2++;
            document.getElementById("pillar2").innerHTML = "<img src='images/pillarFull.png' style='width:200px;height:240px'>"
        } else {
            pill2--;
            document.getElementById("pillar2").innerHTML = "<img src='images/pillar.png' style='width:200px;height:240px'>"
        }
    });
    $('#pillar3').click(function() {
        if (pill3 === 0) {
            pill3++;
            document.getElementById("pillar3").innerHTML = "<img src='images/pillarFull.png' style='width:200px;height:240px'>"
        } else {
            pill3--;
            document.getElementById("pillar3").innerHTML = "<img src='images/pillar.png' style='width:200px;height:240px'>"
        }
    });
    $('#bell').click(function() {
        ring++;
        document.getElementById("bell").innerHTML = "<img src='images/bellDingDing.png' style='width:200px;height:240px'>"
        if (ring === 1) {
            //   document.getElementById("bell").innerHTML = "<img src='images/bellDingDing.png' style='width:200px;height:240px'>"
            //   ring--;
            // }else{
            //   document.getElementById("bell").innerHTML = "<img src='images/bell.png' style='width:200px;height:240px'>"
        }
    });

    $('#seat21').click(function() {
        if (seat1 === 0) {
            seat1++;
            document.getElementById("seat21").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"
        } else {
            seat1--;
            document.getElementById("seat21").innerHTML = "<img src='images/seatAvi.png' style='width:200px;height:170px'>"
        }
    });


    setInterval(function() {
      var count =0;
      var seatAvi = 4-count;
      $.ajax({
          url: link + "people"
      }).done(function(data) {
            $("#manyPeople").text(data + " Peoples in the car");
          console.log(data);
          console.log("People SUCCESS");
      }).fail(function() {
          console.log("People FAIL");
      });

        $.ajax({
            url: link + "seat1"
            // url: "file:///Users/panther/Documents/project/busUsers.html"
        }).done(function(data) {
          if(data===1){
            count++;
          }else {
            count--;
          }
            console.log(data);
            console.log("Seat1 SUCCESS");
        }).fail(function() {
            console.log("Seat1 FAIL");
        });
        $.ajax({
            url: link + "seat2"
            // url: "file:///Users/panther/Documents/project/busUsers.html"
        }).done(function(data) {
            console.log(data);
            console.log("Seat2 SUCCESS");
            if(data===1){
              count++;
            }else {
              count--;
            }
        }).fail(function() {
            console.log("Seat2 FAIL");
        });
        $.ajax({
            url: link + "seat3"
            // url: "file:///Users/panther/Documents/project/busUsers.html"
        }).done(function(data) {
            console.log(data);
            console.log("Seat3 SUCCESS");
            if(data===1){
              count++;
            }else {
              count--;
            }
            console.log("many people sit");
            console.log(count);
              $('#seatBar').css('width', valeur+'%').attr('aria-valuenow', valeur);

        }).fail(function() {
            console.log("Seat3 FAIL");
        });




        $.ajax({
            url: link + "seat4"
            // url: "file:///Users/panther/Documents/project/busUsers.html"
        }).done(function(data) {
            console.log(data);
            console.log("Seat4 SUCCESS");
            if(data===1){
              count++;
            }else {
              count--;
            }
        }).fail(function() {
            console.log("Seat4 FAIL");
        });

        $.ajax({
            url: link + "ring"
            // url: "file:///Users/panther/Documents/project/busUsers.html"
        }).done(function(data) {
            console.log(data);
            console.log("Ring SUCCESS");
            if (ring === 1) {
                document.getElementById("bell").innerHTML = "<img src='images/bellDingDing.png' style='width:200px;height:240px'>"
                ring--;
            } else {
                document.getElementById("bell").innerHTML = "<img src='images/bell.png' style='width:200px;height:240px'>"
            }
        }).fail(function() {
            console.log("Ring FAIL");
        });

        $.ajax({
            url: link + "pillar"
            // url: "file:///Users/panther/Documents/project/busUsers.html"
        }).done(function(data) {
            console.log(data);
            console.log("Pillar2 SUCCESS");
            if (pillar === 0) {
                pillar++;
                document.getElementById("pillar2").innerHTML = "<img src='images/pillarFull.png' style='width:200px;height:240px'>"
            } else {
                pillar--;
                document.getElementById("pillar2").innerHTML = "<img src='images/pillar.png' style='width:200px;height:240px'>"
            }
        }).fail(function() {
            console.log("Pillar2 FAIL");
        });

        $.ajax({
            url: link + "door"
        }).done(function(data) {
            console.log(data);
            console.log("Door SUCCESS");
            if (pillar === 0) {
                door++;
                document.getElementById("door").innerHTML = "<img src ='images/opened.png' style='width:330px;height:300px'>"
            } else {
                door--;
                document.getElementById("door").innerHTML = "<img src ='images/closed.png' style='width:330px;height:300px'>"
            }
        }).fail(function() {
            console.log("Door FAIL");
        });

        // pos++;
        // $("#manyPeople").css("right") = pos + 'px';


        // if (pos == 300) {
        //   pos = 0;
        //    elem.style.right = pos + 'px';
        //   elem.style.left = pos + 'px';
        //   pos++;
        // } else {
        //   pos++;
        //   elem.style.right = pos + 'px';
        //   elem.style.left = pos + 'px';
        // }
        myMove();
    }, 2000);

    function myMove() {
        var elem = $('#manyPeople')
        var id = setInterval(frame, 6);
        var pos = 0;

        function frame() {
            if (pos == 1000) {
                elem.css({ left: '0px' });
            } else {
                pos+= 1;
                elem.css({
                    left: pos + 'px'
                });
            }
        }
    }

});
