app.controller('darkroomController', ['$scope', function ($scope) {
  console.log('darkroom controller working');

  var socket = window.io();

  window.darkroom();
  window.chat();
  window.play();
  window.nio();
  window.nio2();

}]);
