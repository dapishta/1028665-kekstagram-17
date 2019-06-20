/* eslint-disable semi */
'use strict';

// Constants

var ESC_KEYCODE = 27;
var SCALE_PERCENTAGE = 25;

// Pop-up
var uploadBtnTag = document.querySelector('#upload-file');
var uploadPopupTag = document.querySelector('.img-upload__overlay');
var uploadedImgTag = uploadPopupTag.querySelector('.img-upload__preview img');
var uploadCancelBtnTag = uploadPopupTag.querySelector('.img-upload__cancel');

// Scale
var scaleBtnSmallerTag = uploadPopupTag.querySelector('.scale__control--smaller');
var scaleBtnBiggerTag = uploadPopupTag.querySelector('.scale__control--bigger');
var scaleInputTag = uploadPopupTag.querySelector('.scale__control--value');

// Effects
var effectsListTag = uploadPopupTag.querySelector('.effects__list');
var effectNoneTag = effectsListTag.querySelector('#effect-none');
var effectChromeTag = effectsListTag.querySelector('#effect-chrome');
var effectSepiaTag = effectsListTag.querySelector('#effect-sepia');
var effectMarvinTag = effectsListTag.querySelector('#effect-marvin');
var effectPhobosTag = effectsListTag.querySelector('#effect-phobos');
var effectHeatTag = effectsListTag.querySelector('#effect-heat');

var effectChromeStyle = 'effects__preview--chrome';
var effectSepiaStyle = 'effects__preview--sepia';
var effectMarvinStyle = 'effects__preview--marvin';
var effectPhobosStyle = 'effects__preview--phobos';
var effectHeatStyle = 'effects__preview--heat';

var effectSliderTag = uploadPopupTag.querySelector('.img-upload__effect-level');
var effectPinSliderTag = uploadPopupTag.querySelector('.effect-level__pin');


// Remove and add class
var removeClass = function (tag, className) {
  tag.classList.remove(className);
}

var addClass = function (tag, className) {
  tag.classList.add(className);
}


// Open and close popup
var openPopup = function () {
  removeClass(uploadPopupTag, 'hidden');
  document.addEventListener('keydown', onPopupEscPress);
  uploadCancelBtnTag.addEventListener('click', onPopupCancelTagClick);
  scaleBtnSmallerTag.addEventListener('click', function () {
    updateScale(getNewStepperValue(false));
  })
  scaleBtnBiggerTag.addEventListener('click', function () {
    updateScale(getNewStepperValue(true));
  })
};

var closePopup = function () {
  addClass(uploadPopupTag, 'hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Change scale
var getNewStepperValue = function (isPositive) {
  var inputTagValue = scaleInputTag.value
  var currentValue = parseInt(inputTagValue, 10);
  var newValue = currentValue;

  if (isPositive) {
    newValue = currentValue + SCALE_PERCENTAGE;
    if (newValue > 100) {
      newValue = 100;
    }
  } else {
    newValue = currentValue - SCALE_PERCENTAGE;
    if (newValue < 25) {
      newValue = 25;
    }
  }
  return newValue;
}

var updateScale = function (number) {
  scaleInputTag.value = number;
  var cssScale = number / 100;
  uploadedImgTag.style.transform = 'scale(' + cssScale + ')';
}


// Handlers
var onPopupCancelTagClick = function () {
  closePopup(uploadPopupTag);
}

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(uploadPopupTag);
  }
}

var onUploadBtnTagClick = function () {
  addClass(effectSliderTag, 'hidden');
  openPopup(uploadPopupTag);
};


uploadBtnTag.addEventListener('change', onUploadBtnTagClick);


// Filters
var currentFilter = false;

var addFilter = function (filter) {
  if (currentFilter) {
    removeClass(uploadedImgTag, currentFilter);
  }
  currentFilter = filter;
  addClass(uploadedImgTag, filter);
  removeClass(effectSliderTag, 'hidden');
}

effectChromeTag.addEventListener('click', function () {
  addFilter(effectChromeStyle);
})

effectSepiaTag.addEventListener('click', function () {
  addFilter(effectSepiaStyle);
})

effectMarvinTag.addEventListener('click', function () {
  addFilter(effectMarvinStyle);
})

effectPhobosTag.addEventListener('click', function () {
  addFilter(effectPhobosStyle);
})

effectHeatTag.addEventListener('click', function () {
  addFilter(effectHeatStyle);
})

effectNoneTag.addEventListener('click', function () {
  removeClass(uploadedImgTag, currentFilter);
  addClass(effectSliderTag, 'hidden');
})

effectPinSliderTag.addEventListener('mouseup', function () {
})
