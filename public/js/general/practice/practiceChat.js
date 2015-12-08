function practiceChat () {

$(function() {
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  // Initialize variables
  var $pWindow = $(window);
  var $pUsernameInput = $('.pUsernameInput'); // Input for username
  var $pMessages = $('.pMessages'); // Messages area
  var $pInputMessage = $('.pInputMessage'); // Input message input box

  var $pLoginPage = $('.pLogin.pPage'); // The login page
  var $pChatPage = $('.pChat.pPage'); // The chatroom page

  // Prompt for setting a username
  var pUsername;
  var pConnected = false;
  var pTyping = false;
  var pLastTypingTime;
  var $pCurrentInput = $usernameInput.focus();
  var $pWelcome = $('.welcome');

  //create an array of user names
  var pUsernames = [];

  function pAddParticipantsMessage (data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "there's 1 participant";
    } else {
      message += "there are " + data.numUsers + " participants";
    }
    log(message);
  }

  // Sets the client's username
  function pSetUsername () {
    pUsername = cleanInput($pUsernameInput.val().trim());
    pWelcome.text("Welcome "+ pUsername +"!")

    // If the username is valid
    if (pUsername) {
      $ploginPage.fadeOut();
      $pchatPage.show();
      $ploginPage.off('click');
      $pcurrentInput = $pinputMessage.focus();
    }
  }

  // Sends a chat message
  function pSendMessage () {
    var pMessage = $pinputMessage.val();
    // Prevent markup from being injected into the message
    pMessage = cleanInput(pMessage);
    // if there is a non-empty message and a socket connection
    if (pMessage && pConnected) {
      $pInputMessage.val('');
      pAddChatMessage({
        username: pUsername,
        message: pMessage
      });
    }
  }

  // Log a message
  function pLog (message, options) {
    var $pEl = $('<li>').addClass('log').text(message);
    addMessageElement($pEl, options);
  }

  // Adds the visual chat message to the message list
  function pAddChatMessage (data, options) {
    // Don't fade the message in if there is an 'X was typing'
    var $pTypingMessages = getTypingMessages(data);
    pOptions = options || {};
    if ($pTypingMessages.length !== 0) {
      options.fade = false;
      $pTypingMessages.remove();
    }

    var $pUsernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    var $pmessageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    var typingClass = data.typing ? 'typing' : '';
    var $pmessageDiv = $p('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($pusernameDiv, $pmessageBodyDiv);

    addMessageElement($pmessageDiv, options);
  }

  // Adds the visual chat typing message
  function addChatTyping (data) {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  function removeChatTyping (data) {
    getTypingMessages(data).fadeOut(function () {
      $p(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  function addMessageElement (el, options) {
    var $pel = $p(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $pel.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $pmessages.prepend($pel);
    } else {
      $pmessages.append($pel);
    }
    $pmessages[0].scrollTop = $pmessages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput (input) {
    return $p('<div/>').text(input).text();
  }

  // Updates the typing event
  function updateTyping () {
    if (connected) {
      if (!typing) {
        typing = true;
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function () {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  function getTypingMessages (data) {
    return $p('.typing.message').filter(function (i) {
      return $p(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  function getUsernameColor (username) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  // Keyboard events

  $pwindow.keydown(function (event) {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $pcurrentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        sendMessage();
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $pinputMessage.on('input', function() {
    updateTyping();
  });

  // Click events

  // Focus input when clicking anywhere on login page
  $ploginPage.click(function () {
    $pcurrentInput.focus();
  });

  // Focus input when clicking on the message input's border
  $pinputMessage.click(function () {
    $pinputMessage.focus();
  });


});


}
