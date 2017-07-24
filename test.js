var link = "http://158.108.165.223/data/kaoyum/"

  setInterval(function() {
    $.ajax({
        url: link + "seat1"
    }).done(function() {
      console.log(panther);
        console.log("Seat1 SUCCESS");
    }).fail(function() {
        console.log("Seat1 FAIL");
    });
  });
