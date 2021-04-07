(function () {
  var mapPins = document.querySelector('.map').querySelector('.map__pins');

  var makePin = function(data) {
    var temlate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pin = temlate.cloneNode(true);
    var onClickPin = function () {
      var mapCard = document.querySelector('.map__card');

      if (mapCard) {
        mapCard.remove();
      }
      window.card.renderCard(data);
    };

    pin.style.left = data.location.x - pin.clientWidth + 'px';
    pin.style.top = data.location.y - pin.clientHeight + 'px';
    pin.querySelector('img').src = data.author.avatar;
    pin.querySelector('img').alt = data.offer.title;
    pin.addEventListener('click', onClickPin);
    return pin;
    };

  var drawPins = function(pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(makePin(pins[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    makePin: makePin,
    drawPins: drawPins
  };
})();
