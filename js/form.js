(function () {
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
  typeRoom.addEventListener('change', onChangeType);
  timeIn.addEventListener('change', onChangeTimeIn);
  timeOut.addEventListener('change', onChangeTimeOut);

  window.form = {
    enabledForm: enabledForm,
    disabledForm: disabledForm
  }
})();
