'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['hotel1', 'hotel2', 'hotel3'];

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');

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

 var makePins = function() {
  var pins = [];
  for ( var i = 0; i < 8; i++) {
    var pin = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },

      offer: {
        title: '',
        address: '600, 350',
        price: '',
        type: TYPE[getRandom(TYPE.length)],
        rooms: '',
        guests: '',
        checkin: CHECK_TIME[getRandom(CHECK_TIME.length)],
        checkout: CHECK_TIME[getRandom(CHECK_TIME.length)],
        features: randomArray(FEATURES),
        description: '',
        photos: randomArray(PHOTOS)
      },

      location: {
        x: getRandom(mapPins.clientWidth),
        y: 130 + getRandom(500)
        }
      }
      pins.push(pin);
    }
  return pins;
 };

 var drawPins = function(pins) {
    var temlate = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      var pin = temlate.cloneNode(true);

      pin.style.left = pins[i].location.x - pin.clientWidth/2 + 'px';
      pin.style.top = pins[i].location.y - pin.clientHeight + 'px';
      pin.querySelector('img').src = pins[i].author.avatar;
      pin.querySelector('img').alt = pins[i].offer.title;
      fragment.appendChild(pin);
   }
   mapPins.appendChild(fragment);
 }

map.classList.remove('map--faded');
drawPins(makePins());
