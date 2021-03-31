(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adFormAddress = document.querySelector('.ad-form').querySelector('#address');
  var mapPins = document.querySelector('.map').querySelector('.map__pins');

  var MAP_WIDTH = mapPins.clientWidth;
  var MAP_HEIGHT = mapPins.clientHeight;

  var onRemoveFaded = function() {
    var pins = window.pin.makePins();

    map.classList.remove('map--faded');
    window.pin.drawPins(pins);
    window.card.renderCard(pins);
    window.form.enabledForm();
  };

  mapPinMain.addEventListener('mousedown', onRemoveFaded);

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
})();
