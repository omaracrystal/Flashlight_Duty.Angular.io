function darkroom() {

  var socket = io();

  var response;
  var $response = $('#response');
  var $nioPopUp = $('#nioPopUp');
  var $nioImg = $('#nioImg');
  var $nioNah = $('#nioNah');
  var $nioYes = $('#nioYes');
  var $nioHuh = $('#nioHuh');
  var $nioCon = $('#nioContent');
  var $welcome = $('#welcome');
  var $phoneInput = $('#phoneInput');
  var $masked = $('.masked');
  var $onDuty = $('#onDuty');
  var $usernameInput = $('.usernameInput');


////////// *** N.IO CONNECT *** //////////

  $nioPopUp.hide();
  $nioCon.hide();

  $nioImg.on('click', function() {
    $phoneInput.val("");
    $nioPopUp.css('height', '280px');
    $nioPopUp.show();
  });

  $nioNah.on('click', function() {
    $nioCon.hide();
    $nioPopUp.hide();
    $usernameInput.focus();
  });

  $nioYes.on('click', function() {
    // var welcomeName = $welcome.text().substring(8, $welcome.text().length-1).toLowerCase();
    // var onDuty = $onDuty.text().toLowerCase();
    var phone = $phoneInput.val();
    hello(phone);

    // if (welcomeName === onDuty) {
    //   var phone = $phoneInput.val();
    //   hello(phone);
    // } else {
    //   alert("Sorry! You have to be on Flashlight Duty in order to change to N.io");
    // }
  });

  $nioHuh.on('click', function() {
    $nioCon.show();
    $('.btn').css('margin-top', '0px');
    $nioPopUp.css('height', '400px');
  });

  function hello(phone) {
    console.log(phone);
    var g = $.post("http://textbelt.com/text",
    { number: phone,
      message: "To connect to n.io please login at: n.io/crystal/mainapp.php"
    }).done(function (){
      response = JSON.parse(g.responseText);
      $phoneInput.css('margin-top','20px');
      $nioPopUp.css('height', '280');

      if (response.success) {
        $response.replaceWith("Text sent! Please follow the link to finishing connecting with n.io");
      } else {
        $response.replaceWith(response.message);
      }
    });
  }


  ////////// *** WELCOME TO THE DARK SIDE *** //////////

  function flashlightOff() {
    $masked.css({
        '-webkit-mask-image': ''
      });
  }


//update according to other's x and y
  function flashlight(e) {
    var mouseX = e.pageX - $masked.offset().left;
    var mouseY = e.pageY - $masked.offset().top;
    $masked.css({
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
    $masked.css({
      '-webkit-mask-image': 'radial-gradient(circle 40px at ' + mouseX + 'px ' + mouseY + 'px, rgba(255,255,255,1) 60%, rgba(255,255,255,0) 100%)',
      'cursor': 'none'
    });
  }

//listening to pass x and y cordinates to function
  socket.on('mouse move', function(data) {
    flashlight2(data.x, data.y);
  });


  $masked.on({
    'mousemove': flashlight,
    'mouseleave': flashlightOff
  });

}

