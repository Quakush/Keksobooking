(function () {
  var getRandom = function(x) {
    var num = Math.floor(Math.random(x) * x);

    return num;
  };

    var randomArray = function(array) {
    var i = getRandom(array.length);
    var arr = [];
    for (var k = 0; k <= i; k++) {
      arr.push(array[getRandom(array.length)]);
    }
    return arr;
  };

  window.utils = {
    getRandom: getRandom,
    randomArray: randomArray
  }
})();
