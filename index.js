// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var favicon = require('serve-favicon');
var textbelt = require('./textbelt.js');
var text = require('textbelt');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

app.use(express.favicon(__dirname + '/public/images/favicon.ico'));


// Chatroom

// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'winner known', this listens and executes
  socket.on('winner known', function (data) {
    console.log(data);
    socket.broadcast.emit('winner known', data);
  });

// when the client emits 'switch image', this listens and executes
  socket.on('switch image', function (data) {
    console.log(data);
    socket.broadcast.emit('switch image', data);
  });

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when client emits 'mouse move', we broadcast it to others
  socket.on('mouse move', function(data) {
    // console.log(data);
    socket.broadcast.emit('mouse move', data);
  });

  // when client emits 'nio mouse move', we broadcast it to others
  socket.on('nio mouse move', function(data) {
    // console.log(data);
    socket.broadcast.emit('nio mouse move', data);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });

});
