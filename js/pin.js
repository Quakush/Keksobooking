(function () {
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['hotel1', 'hotel2', 'hotel3'];
  var mapPins = document.querySelector('.map').querySelector('.map__pins');

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
          type: TYPE[window.utils.getRandom(TYPE.length)],
          rooms: window.utils.getRandom(3)+1,
          guests: window.utils.getRandom(5),
          checkin: CHECK_TIME[window.utils.getRandom(CHECK_TIME.length)],
          checkout: CHECK_TIME[window.utils.getRandom(CHECK_TIME.length)],
          features: window.utils.randomArray(FEATURES),
          description: '',
          photos: window.utils.randomArray(PHOTOS)
        },

        location: {
          x: window.utils.getRandom(mapPins.clientWidth),
          y: 130 + window.utils.getRandom(500)
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

        pin.style.left = pins[i].location.x - pin.clientWidth + 'px';
        pin.style.top = pins[i].location.y - pin.clientHeight + 'px';
        pin.querySelector('img').src = pins[i].author.avatar;
        pin.querySelector('img').alt = pins[i].offer.title;
        fragment.appendChild(pin);
      }
      mapPins.appendChild(fragment);
    };

    window.pin = {
      makePins: makePins,
      drawPins: drawPins
    }
})();
