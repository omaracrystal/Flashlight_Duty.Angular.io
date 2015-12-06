var socket = io();

function darkroom(){
    function flashlightOff() {
      $(this).css({
          '-webkit-mask-image': ''
        });
      }

//update according to other's x and y
      function flashlight(e) {
        var mouseX = e.pageX - $(this).offset().left;
        var mouseY = e.pageY - $(this).offset().top;
        $(this).css({
          '-webkit-mask-image': 'radial-gradient(circle 40px at ' + mouseX + 'px ' + mouseY + 'px, rgba(255,255,255,1) 60%, rgba(255,255,255,0) 100%)',
          'cursor': 'none'
        });
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

      socket.on('mouse move', function(data) {
        flashlight2(data.x, data.y);
      });


      $('.masked').on({
        'mousemove': flashlight,
        'mouseleave': flashlightOff
      });
  }

  darkroom();
