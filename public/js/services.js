//these are just references the instance of related lib so we can inject them to the controllers/services in an angular way.
app.factory('jQuery', [
    '$window',
    function ($window) {
        return $window.jQuery;
    }
]);

app.factory('Modernizr', [
    '$window',
    function ($window) {
        return $window.Modernizr;
    }
]);

app.factory('Highcharts', [
  '$window',
  function ($window) {
      return $window.Highcharts;
  }
]);
