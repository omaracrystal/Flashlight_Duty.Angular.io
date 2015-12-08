//pull chat respones
function practice(){

  var $pWinner = $('#pWinner');
  var $pShowImage = $('.pShowImage');
  var $pInputMessage = $('.pInputMessage');
  var $pImage = $('#pImage');
  var $pMessage = $('.pMessage');
  var $pNav = $('.pNav');

  var pWinner, pLastMessage, pUsername, pGuess, pSrcArr, pSrc,pImage;

  var pScore= 0;

//represents the names to all the images
  var pImages = [ "paris", "trump", "kittens", "llama", "waterfall", "octopus", "puppy", "fountain"
  ];


  $pWinner.hide();
  $pShowImage.hide();

//after the enter key is pressed the checkGuess() function runs
  $pInputMessage.on("keypress", function(e) {
    if (e.keyCode == 13) {
        pCheckGuess();
        return false; // prevent the button click from happening
    }
  });

  //checks to see if most recent message matches the image name and alerts winner
  function pCheckGuess() {
    pLastMessage = $pMessage.last(),
    pUsername = pLastMessage.children('span').eq(0).text().toLowerCase(),
    pGuess = pLastMessage.children('span').eq(1).text().toLowerCase(),
    pSrcArr = pMasked.attr('src').split('/'),
    pSrc = pSrcArr.reverse()[0],
    pImage = pSrc.substring(0, pSrc.length - 4).toLowerCase();

    if (pImage === pGuess) {
      pWinner = pUsername;
      pAlertWinner(pWinner);
      pUpdateScore();
      pSwitchImage(pImage);
      return "That is correct " + pWinner + "!";
    } else {
      return "That is wrong " + pUsername;
    }
  }

  function pAlertWinner(pWinner) {
    pWinner.text('AWESOME ' + pWinner + "! The answer is " + pImage + " :)");
    pWinner.show();
    $pShowImage.show();
    setTimeout(function(){ $pWinner.hide(); }, 3000);
    setTimeout(function(){ $pShowImage.hide(); }, 6000);
    setTimeout(function(){ $pImage.show(); }, 6500);
  }


  function pUpdateScore() {
    pScore++;
    $('.nav').children().eq(0).text("Score: "+score);
    console.log(score);
  }

  //once score is updated for correct answer then a new image appears
  function pSwitchImage(pImage) {
    var first = "<img class='pMasked' id='pImage' src='/./images/darkroom/";
    var last = ".png' style='cursor:none'/>";
    var grabImage = $pImage;
    var showImage = $pShowImage;
    var first2 = "<img class='pShowImage' src='/./images/darkroom/";
    var last2 = ".png'/>";
    var pNewImage;

    for (i=0; i< pImages.length; i++) {
      if (pImages[i] === pImage) {
        pNewImage = grabImage.replaceWith(first+pImages[i+1]+last);
        showImage.replaceWith(first2+images[i]+last2);
        darkroom();
        grabImage.hide();
        //emit new image to others
        return pNewImage;
      }
    }
  }

}







