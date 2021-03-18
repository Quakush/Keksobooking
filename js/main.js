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
        rooms: getRandom(3)+1,
        guests: getRandom(5),
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

    pin.style.left = pins[i].location.x - pin.clientWidth + 'px';
    pin.style.top = pins[i].location.y - pin.clientHeight + 'px';
    pin.querySelector('img').src = pins[i].author.avatar;
    pin.querySelector('img').alt = pins[i].offer.title;
    fragment.appendChild(pin);
  }
  mapPins.appendChild(fragment);
};

var renderCard = function(pins) {
  var pin = pins[0];
  var template = document.querySelector('#card').content.querySelector('.popup');
  var card = template.cloneNode(true);
  var features = card.querySelector('.popup__features');
  var photos = card.querySelector('.popup__photos');
  var type = '';

  switch(pin.offer.type) {
    case 'flat':
      type = 'Квартира';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'palace':
      type = 'Дворец';
      break;
  }

  features.innerHTML = '';
  for (var i = 0; i < pin.offer.features.length; i++) {
    var feature;

    switch(pin.offer.features[i]) {
      case 'wifi':
        feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--wifi');
        features.appendChild(feature);
      case 'dishwasher':
        feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--dishwasher');
        features.appendChild(feature);
      case 'parking':
        feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--parking');
        features.appendChild(feature);
      case 'washer':
        feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--washer');
        features.appendChild(feature);
      case 'elevator':
        feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--elevator');
        features.appendChild(feature);
      case 'conditioner':
        feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--conditioner');
        features.appendChild(feature);
    }
  }

  photos.innerHTML = '';
  for(var i = 0; i < pin.offer.photos.length; i++) {
    var img = document.createElement('img');

    img.classList.add('popup__photo');
    img.style.width = 45 + 'px';
    img.style.height = 40 + 'px';
    img.src = 'http://o0.github.io/assets/images/tokyo/' + pin.offer.photos[i] + '.jpg';
    photos.appendChild(img);
  }

  card.querySelector('.popup__title').textContent = pin.offer.title;
  card.querySelector('.popup__text--address').textContent = pin.offer.address;
  card.querySelector('.popup__text--price').textContent = pin.offer.price + 'Р/ночь';
  card.querySelector('.popup__type').textContent = type;
  card.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей'
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд после ' + pin.offer.checkout;
  card.querySelector('.popup__description').textContent = pin.offer.description;
  card.querySelector('.popup__avatar').src = pin.author.avatar;

  mapPins.insertAdjacentElement('afterend', card);
};

var pins = makePins();
map.classList.remove('map--faded');
drawPins(pins);
renderCard(pins);
