'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['hotel1', 'hotel2', 'hotel3'];

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormInput = adForm.querySelectorAll('input');
var adFormSelect = adForm.querySelectorAll('select');
var adFormTextArea = adForm.querySelectorAll('textarea');
var adFormButton = adForm.querySelectorAll('button');
var adForm = document.querySelector('.ad-form');
var typeRoom = adForm.querySelector('#type');
var priceForm = adForm.querySelector('#price');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
var adFormAddress = adForm.querySelector('#address');

var MAP_WIDTH = mapPins.clientWidth;
var MAP_HEIGHT = mapPins.clientHeight;

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
  console.log(pin.offer.address);
  adForm.querySelector('#address').value = pin.offer.address;

  mapPins.insertAdjacentElement('afterend', card);
};

var disabledForm = function() {
  adFormInput.forEach(el => {
    el.setAttribute('disabled', true);
  });

  adFormSelect.forEach(el => {
    el.setAttribute('disabled', true);
  });

  adFormTextArea.forEach(el => {
    el.setAttribute('disabled', true);
  });

  adFormButton.forEach(el => {
    el.setAttribute('disabled', true);
  });
};

var enabledForm = function() {
  adFormInput.forEach(el => {
    el.removeAttribute('disabled');
  });

  adFormSelect.forEach(el => {
    el.removeAttribute('disabled');
  });

  adFormTextArea.forEach(el => {
    el.removeAttribute('disabled');
  });

  adFormButton.forEach(el => {
    el.removeAttribute('disabled');
  });

  adForm.classList.remove('ad-form--disabled');
};

var onRemoveFaded = function() {
  var pins = makePins();

  map.classList.remove('map--faded');
  drawPins(pins);
  renderCard(pins);
  enabledForm();
};

var onChangeType = function() {
  switch (typeRoom.value) {
    case 'bungalo':
      priceForm.placeholder = '0';
      priceForm.setAttribute('min', '0');
      break;
    case 'flat':
      priceForm.placeholder = '1000';
      priceForm.setAttribute('min', '1000');
      break;
    case 'house':
      priceForm.placeholder = '5000';
      priceForm.setAttribute('min', '5000');
      break;
    case 'palace':
      priceForm.placeholder = '10000';
      priceForm.setAttribute('min', '10000');
      break;
  }
};

var onChangeTimeIn = function() {
  switch (timeIn.value) {
    case '12:00':
      timeOut.value = '12:00';
      break;
    case '13:00':
      timeOut.value = '13:00';
      break;
    case '14:00':
      timeOut.value = '14:00';
      break;
  }
};

var onChangeTimeOut = function() {
  switch (timeOut.value) {
    case '12:00':
      timeIn.value = '12:00';
      break;
    case '13:00':
      timeIn.value = '13:00';
      break;
    case '14:00':
      timeIn.value = '14:00';
      break;
  }
};

disabledForm();
mapPinMain.addEventListener('mousedown', onRemoveFaded);
typeRoom.addEventListener('change', onChangeType);
timeIn.addEventListener('change', onChangeTimeIn);
timeOut.addEventListener('change', onChangeTimeOut);

mapPinMain.addEventListener('mousedown', function (evt) {
  mapPinMain.removeEventListener('mousedown', onRemoveFaded);
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    adFormAddress.value = mapPinMain.offsetLeft + Math.round(mapPinMain.clientWidth/2) + ', ' + (mapPinMain.offsetTop + mapPinMain.clientHeight)
    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

    if (mapPinMain.offsetTop <= 0) {
      mapPinMain.style.top = 0 + 'px';
    }

    if (mapPinMain.offsetLeft <= 0) {
      mapPinMain.style.left = 0 + 'px';
    }

    if (mapPinMain.offsetTop >= (MAP_HEIGHT - mapPinMain.clientHeight)) {
      mapPinMain.style.top = MAP_HEIGHT - mapPinMain.clientHeight + 'px';
    }

    if (mapPinMain.offsetLeft >= (MAP_WIDTH - mapPinMain.clientWidth)) {
      mapPinMain.style.left = MAP_WIDTH - mapPinMain.clientWidth + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


