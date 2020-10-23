'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var canvas = map.querySelector('.map__pins');

var getRandom = function(x) {
  return Math.floor(Math.random() * x);
};

var generatePins = function() {
  var pins = [];

  for (var i = 0; i < 8; i++) {
    var pin = {
      author: {
        avatar: './img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Hello!',
        address: '600, 350',
        price: 100,
        type: TYPE[getRandom(TYPE.length)],
        rooms: 1,
        guests: 1,
        checkin: CHECKIN[getRandom(CHECKIN.length)],
        checkout: CHECKIN[getRandom(CHECKIN.length)],
        features: FEATURES,
        description: 'bla bla bla',
        photos: PHOTOS
      },
      location: {
        x: getRandom(map.offsetWidth),
        y: 130 + getRandom(500)
      }
    };
    pins.push(pin);
  }
  return pins;
};

var renderPins = function(pins) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for(var i = 0; i < pins.length; i++) {
    var element = template.cloneNode(true);
    var pin = pins[i];

    element.style.left = pin.location.x + 'px';
    element.style.top = pin.location.y + 'px';
    element.querySelector('img').src = pin.author.avatar;
    element.querySelector('img').alt = pin.offer.title;

    fragment.appendChild(element);
  }
  canvas.appendChild(fragment);
};

var renderCard = function(obj) {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var fragment = document.createDocumentFragment();
  var element = template.cloneNode(true);
  var photos = element.querySelector('.popup__photos');
  var it = obj[0];
  var type = '';

  switch (it.offer.type) {
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

  element.querySelector('.popup__title').textContent = it.offer.title;
  element.querySelector('.popup__text--address').textContent = it.offer.address;
  element.querySelector('.popup__text--price').textContent = it.offer.price + String.fromCharCode(8381) + '/ночь.';
  element.querySelector('.popup__type').textContent = type;
  element.querySelector('.popup__text--capacity').textContent = it.offer.rooms + ' комнаты для ' + it.offer.guests + ' гостей.';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + it.offer.checkin + ', выезд до ' + it.offer.checkout;
  element.querySelector('.popup__avatar').src = it.author.avatar;
  element.querySelector('.popup__description').textContent = it.offer.description;
  element.querySelector('.popup__photo').src = it.offer.photos[0];

  for (let i = 1; i < it.offer.photos.length; i++) {
    let img = new Image(45, 40);
    img.src = it.offer.photos[i];
    photos.appendChild(img);
  }

  let features = element.querySelector('.popup__features');
  features.innerHTML = '';

  for (let i = 0; i < it.offer.features.length; i++) {
    let li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + it.offer.features[i]);
    features.appendChild(li);
  }

  fragment.appendChild(element);
  canvas.after(fragment);
};

map.classList.remove('map--faded');

let data = generatePins();

renderPins(data);
renderCard(data);
