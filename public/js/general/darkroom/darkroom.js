function darkroom() {

  var socket = io();

  socket.on('nio mouse move', function(data) {
    window.data();
  })

  var nioPopUp = $('#nioPopUp');
  var nioImg = $('#nioImg');
  var nioNah = $('#nioNah');
  var nioYes = $('#nioYes');
  var nioHuh = $('#nioHuh');
  var nioCon = $('#nioContent');
  var welcome = $('#welcome');

  nioPopUp.hide();

  nioImg.on('click', function() {
    nioPopUp.show();
  });

  nioNah.on('click', function() {
    nioPopUp.hide();
  })

  nioYes.on('click', function() {
    nioPopUp.hide();
    var welcomeName = welcome.text().substring(8, welcome.text().length-1).toLowerCase();
    var onDuty = $('#onDuty').text().toLowerCase()
    if (welcomeName === onDuty) {
      window.nio2();
    } else {
      alert("Sorry! You have to be on Flashlight Duty in order to change to N.io");
    };
  })

  nioHuh.on('click', function() {
    nioCon.replaceWith("<h1>Connect to n.io?</h1><h3>N.io allows you to connect your mobile device as a controller to this game.<br> Instead of using the mousepad to move your flashlight up, down, left or right over the image, you can use your phone's movement to do that same!</h3>");
    $('.btn').css('margin-top', '10px');
    nioPopUp.css('height', '380px');
  })

  function flashlightOff() {
    $('.masked').css({
        '-webkit-mask-image': ''
      });
  }


//update according to other's x and y
  function flashlight(e) {
    var mouseX = e.pageX - $('.masked').offset().left;
    var mouseY = e.pageY - $('.masked').offset().top;
    $('.masked').css({
      '-webkit-mask-image': 'radial-gradient(circle 40px at ' + mouseX + 'px ' + mouseY + 'px, rgba(255,255,255,1) 60%, rgba(255,255,255,0) 100%)',
      'cursor': 'none'
    });
    //emit the x and y values of this client
    socket.emit('mouse move', {x: mouseX, y: mouseY});
  }

  function flashlight2(x, y) {
    var mouseX = x;
    var mouseY = y;
    // console.log(x, y);
    $('.masked').css({
      '-webkit-mask-image': 'radial-gradient(circle 40px at ' + mouseX + 'px ' + mouseY + 'px, rgba(255,255,255,1) 60%, rgba(255,255,255,0) 100%)',
      'cursor': 'none'
    });
  }

//listening to pass x and y cordinates to function
  socket.on('mouse move', function(data) {
    flashlight2(data.x, data.y);
  });


  $('.masked').on({
    'mousemove': flashlight,
    'mouseleave': flashlightOff
  });

}

