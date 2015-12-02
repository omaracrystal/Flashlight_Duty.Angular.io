//pull chat respones
(function play(){

  var winner, lastMessage, username, guess, srcArr, src, image;
  var score= 0;

//represents the names to all the images
  var images = [ "paris", "trump", "kittens", "llama", "waterfall", "octopus", "puppy", "fountain"
  ]

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
    image = src.substring(0, src.length - 4).toLowerCase()

    if (image === guess) {
      winner = username;
      alert("That is correct " + winner + "!");
      updateScore();
      switchImage();
      return "That is correct " + winner + "!";
    } else {
      return "That is wrong " + username;
    }
  };

  function updateScore() {
    score++;
    console.log(score);
    // for (i=0; i<userArr.length; i++) {
    //   if (winner === userArr[i]) {
    //     score++;
    //     console.log(score);
    //   }
    // }
  }

  //once score is updated for correct answer then a new image appears
  function switchImage() {
    console.log(images);
    var first = "<img class='masked' id='image' src='/./images/darkroom/";
    var last = ".png' style='cursor:none'/>";
    var grabImage = $('#image');
    console.log(grabImage);
    for (i=0; i<images.length; i++) {
      if (images[i] === image) {
        console.log(images[i+1]);
        var newImage = $('#image').replaceWith(first+images[i+1]+last);
        console.log(newImage);
        darkroom();
        return newImage;
      };
    };
  };

})();


