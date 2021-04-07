(function () {
  var renderCard = function(pin) {
    var template = document.querySelector('#card').content.querySelector('.popup');
    var card = template.cloneNode(true);
    var closeCard = card.querySelector('.popup__close');
    var features = card.querySelector('.popup__features');
    var photos = card.querySelector('.popup__photos');
    var type = '';

    closeCard.addEventListener('click', removeMapCard);

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
    };

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
    document.querySelector('#address').value = pin.offer.address;

    document.querySelector('.map').querySelector('.map__pins').insertAdjacentElement('afterend', card);
  }

  var removeMapCard = function () {
    var mapCard = document.querySelector('.map__card');

    if (mapCard) {
      mapCard.remove();
    }
  };

  window.card = {
    renderCard: renderCard
  };
})();
