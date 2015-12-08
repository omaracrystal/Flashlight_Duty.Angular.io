//pull chat respones
function play(){

  var socket = io();

  $('#winner').hide();

  $('.showImage').hide();

  var winner, lastMessage, username, guess, srcArr, src, image;
  var score= 0;

//represents the names to all the images
  var images = [ "paris", "trump", "kittens", "llama", "waterfall", "octopus", "puppy", "fountain"
  ];

//after the enter key is pressed the checkGuess() function runs
  $('.inputMessage').on("keypress", function(e) {
    if (e.keyCode == 13) {
        checkGuess();
        return false; // prevent the button click from happening
    }
  });

  //checks to see if most recent message matches the image name and alerts winner
  function checkGuess() {
    lastMessage = $('.message').last(),
    username = lastMessage.children('span').eq(0).text().toLowerCase(),
    guess = lastMessage.children('span').eq(1).text().toLowerCase(),
    srcArr = $('.masked').attr('src').split('/'),
    src = srcArr.reverse()[0],
    image = src.substring(0, src.length - 4).toLowerCase();

    if (image === guess) {
      winner = username;

///////////// ************ HELP! ************ /////////////
      //emit winner and image
      // socket.emit('winner known', winner);
      // socket.emit('image known', image);
      // socket.emit('check winner');
///////////// ************ HELP! ************ /////////////

      alertWinner(winner);
      updateScore();
      switchImage(image);
      return "That is correct " + winner + "!";
    } else {
      return "That is wrong " + username;
    }
  }

  function alertWinner(winner) {

    $('#winner').text('AWESOME ' + winner + "! The answer is " + image + " :)");
    $('#winner').show();
    $('.showImage').show();
    setTimeout(function(){ $('#winner').hide(); }, 3000);
    setTimeout(function(){ $('.showImage').hide(); }, 6000);
    setTimeout(function(){ $('#image').show(); }, 6500);
  }


  function updateScore() {
    score++;
    $('.nav').children().eq(0).text("Score: "+score);
  }

  //once score is updated for correct answer then a new image appears
  function switchImage(image) {
    var first = "<img class='masked' id='image' src='/./images/darkroom/";
    var last = ".png' style='cursor:none'/>";
    var grabImage = $('#image');
    var showImage = $('.showImage');
    var first2 = "<img class='showImage' src='/./images/darkroom/";
    var last2 = ".png'/>";
    var newImage;

    for (i=0; i<images.length; i++) {
      if (images[i] === image) {
        newImage = grabImage.replaceWith(first+images[i+1]+last);
        showImage.replaceWith(first2+images[i]+last2);
        darkroom();
        $('#image').hide();
        //emit new image to others
        return newImage;
      }
    }
  }

}







