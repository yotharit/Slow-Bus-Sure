var link = "http://158.108.165.223/data/kaoyum/"
var ring = 0;
var seat1 = 0;
var seat2 = 0;
var seat3 = 0;
var seat4 = 0;
var door = 0;
var pill1 = 0;
var pill2 = 0;
var pill3 = 0;
var pos = 0;
var people = 8;
var manySit = 8;

var valeur=66.64;

$(document).ready(function() {

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
        if (pill2 === 0) {
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

        if (ring == 0) {
            document.getElementById("bell").innerHTML = "<img src='images/bellDingDing.png' style='width:200px;height:240px'>"
            $.ajax({
                url: "http://158.108.165.223/data/kaoyum/ring/set/1"
            });
            ring = 1;
        }
    });

    // $('#seat21').click(function() {
    //     if (seat1 === 0) {
    //         seat1++;
    //         document.getElementById("seat21").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"
    //     } else {
    //         seat1--;
    //         document.getElementById("seat21").innerHTML = "<img src='images/seatAvi.png' style='width:200px;height:170px'>"
    //     }
    // });
    // $('#seat22').click(function() {
    //     if (seat2 === 0) {
    //         seat2++;
    //         document.getElementById("seat22").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"
    //     } else {
    //         seat2--;
    //         document.getElementById("seat22").innerHTML = "<img src='images/seatAvi.png' style='width:200px;height:170px'>"
    //     }
    // });
    // $('#seat23').click(function() {
    //     if (seat3 === 0) {
    //         seat3++;
    //         document.getElementById("seat23").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"
    //     } else {
    //         seat1--;
    //         document.getElementById("seat23").innerHTML = "<img src='images/seatAvi.png' style='width:200px;height:170px'>"
    //     }
    // });
    // $('#seat24').click(function() {
    //     if (seat4 === 0) {
    //         seat4++;
    //         document.getElementById("seat24").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"
    //     } else {
    //         seat4--;
    //         document.getElementById("seat24").innerHTML = "<img src='images/seatAvi.png' style='width:200px;height:170px'>"
    //     }
    // });

    $('#door').click(function() {
      if (door == 0) {
          document.getElementById('door').innerHTML = "<img src='images/opened.png' style='width:330px;height:300px'>"
          $.ajax({
              url: "http://158.108.165.223/data/kaoyum/doorin/set/1"
          });
          $.ajax({
              url: "http://158.108.165.223/data/kaoyum/doorout/set/1"
          });
          door = 1;
      }
    })

    setInterval(function() {
      var count =0;
      var seatAvi = 4-count;
      $.ajax({
          url: link + "people"
      }).done(function(data) {
          $("#manyPeople").text((parseInt(data)+4) + " Peoples in the car");
          console.log("Seat Bar " + $('#seatBar').val());
          $('#seatBar').removeClass("progress-bar-success");
          $('#seatBar').removeClass("progress-bar-warning");
          $('#seatBar').removeClass("progress-bar-danger");
          if((data*5)+20 <= 40) {
            $('#seatBar').addClass("progress-bar-success");
          }else if((data*5)+20 <= 70) {
            $('#seatBar').addClass("progress-bar-warning");
          }else {
            $('#seatBar').addClass("progress-bar-danger");
          }
          $('#seatBar h6').text( ((data*5)+20)+ "% People in the car");
          $('#seatBar').css('width', ((data*5)+20)+'%').attr('aria-valuenow', (data*5)+20);
          console.log(data);
          console.log("People SUCCESS");
      }).fail(function() {
          console.log("People FAIL");
      });

        $.ajax({
            // url: link + "seat1"
            url: "http://158.108.165.223/data/kaoyum/seat1"
        }).done(function(data) {
          if (data == 0) {
              document.getElementById("seat21").innerHTML = "<img src='images/seatAvi.png' style='width:200px;height:170px'>"
          } else {
            document.getElementById("seat21").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"
          }
          // if(data===1){
          //   count++;
          // }else {
          //   count--;
          // }
            console.log(data);
            console.log("Seat1 SUCCESS");
        }).fail(function() {
            console.log("Seat1 FAIL");
        });
        $.ajax({
            // url: link + "seat2"
            url: "http://158.108.165.223/data/kaoyum/seat2"
        }).done(function(data) {
          if (data == 0) {
              document.getElementById("seat22").innerHTML = "<img src='images/seatAvi.png' style='width:200px;height:170px'>"
          } else {
            document.getElementById("seat22").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"
          }
          // if(data===1){
          //   count++;
          // }else {
          //   count--;
          // }
            console.log("asdokasdaskd"+data);
            console.log("Seat2 SUCCESS");
        }).fail(function() {
            console.log("Seat2 FAIL");
        });

        $.ajax({
            // url: link + "seat3"
            url: "http://158.108.165.223/data/kaoyum/seat3"
        }).done(function(data) {
          if (data == 0) {
              document.getElementById("seat23").innerHTML = "<img src='images/seatAvi.png' style='width:200px;height:170px'>"
          } else {
            document.getElementById("seat23").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"
          }
          // if(data===1){
          //   count++;
          // }else {
          //   count--;
          // }
            console.log(data);
            console.log("Seat3 SUCCESS");
        }).fail(function() {
            console.log("Seat3 FAIL");
        });

        $.ajax({
            // url: link + "seat4"
            url: "http://158.108.165.223/data/kaoyum/seat4"
        }).done(function(data) {
          if (data == 0) {
            document.getElementById("seat24").innerHTML = "<img src='images/seatAvi.png' style='width:200px;height:170px'>"
          } else {
            document.getElementById("seat24").innerHTML = "<img src='images/seatFull.png' style='width:200px;height:170px'>"
          }
          // if(data===1){
          //   count++;
          // }else {
          //   count--;
          // }
            console.log(data);
            console.log("Seat4 SUCCESS");
            console.log("many people sit");
            console.log(count);
            // $('#seatBar').css('width', valeur+( count*8.33)'%').attr('aria-valuenow', valeur);
        }).fail(function() {
            console.log("Seat4 FAIL");
        });


        $.ajax({
            url: link + "ring"
        }).done(function(data) {
            console.log(data);
            console.log("Ring SUCCESS");
            if (data == 1) {
                document.getElementById("bell").innerHTML = "<img src='images/bellDingDing.png' style='width:200px;height:240px'>"
                ring = 0;
            } else {
                document.getElementById("bell").innerHTML = "<img src='images/bell.png' style='width:200px;height:240px'>"
            }
        }).fail(function() {
            console.log("Ring FAIL");
        });

        $.ajax({
            // url: link + "pillar"
            url: "http://158.108.165.223/data/kaoyum/pillar"
            // http://158.108.165.223/data/kaoyum/pillar
        }).done(function(data) {
            console.log(data);
            console.log("Pillar2 SUCCESS");
            if (data == 0) {
                document.getElementById("pillar2").innerHTML = "<img src='images/pillar.png' style='width:200px;height:240px'>"
            } else {
                document.getElementById("pillar2").innerHTML = "<img src='images/pillarFull.png' style='width:200px;height:240px'>"
            }
        }).fail(function() {
            console.log("Pillar2 FAIL");
        });
        $.ajax({
            url: link + "doorin"
        }).done(function(data) {
            console.log(data);
            console.log("Door SUCCESS");
            if (data == 0) {
                document.getElementById("door").innerHTML = "<img src ='images/closed.png' style='width:260px;height:240px'>"
                door = 1 ;
            } else {
                document.getElementById("door").innerHTML = "<img src ='images/opened.png' style='width:260px;height:240px'>"
            }
        }).fail(function() {
            console.log("Door FAIL");
        });

    }, 2000);

      setInterval( function() {
        var elem = $('#manyPeople')
        if (pos >=460) {
          pos=0;
        } else {
            pos+= 0.5;
            elem.css({
                left: pos + 'px'
            });
        }
      },4)



});
