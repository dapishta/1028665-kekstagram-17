/* eslint-disable semi */
'use strict';


(function () {
  // Scale
  var uploadPopupTag = document.querySelector('.img-upload__overlay');
  var scaleBtnSmallerTag = uploadPopupTag.querySelector('.scale__control--smaller');
  var scaleBtnBiggerTag = uploadPopupTag.querySelector('.scale__control--bigger');
  var scaleInputTag = uploadPopupTag.querySelector('.scale__control--value');
  var uploadedImgTag = uploadPopupTag.querySelector('.img-upload__preview img');
  var SCALE_PERCENTAGE = 25;


  // Change scale
  var getNewStepperValue = function (scaleValue) {
    var currentValue = parseInt(scaleInputTag.value, 10);
    var newValue = currentValue + scaleValue;
    if (newValue > 100) {
      newValue = 100;
    } else if (newValue < 25) {
      newValue = 25;
    }
    return newValue;
  }

  var updateScale = function (number) {
    scaleInputTag.setAttribute('value', number);
    var cssScale = number / 100;
    uploadedImgTag.style.transform = 'scale(' + cssScale + ')';
  }

  var onScaleBtnSmallerClick = function () {
    updateScale(getNewStepperValue(-SCALE_PERCENTAGE));
  };

  var onScaleBtnBiggerClick = function () {
    updateScale(getNewStepperValue(SCALE_PERCENTAGE));
  };

  var addScaleEventListeners = function () {
    scaleBtnSmallerTag.addEventListener('click', onScaleBtnSmallerClick);
    scaleBtnBiggerTag.addEventListener('click', onScaleBtnBiggerClick)
  }

  var removeScaleEventListeners = function () {
    scaleBtnSmallerTag.addEventListener('click', onScaleBtnSmallerClick);
    scaleBtnBiggerTag.addEventListener('click', onScaleBtnBiggerClick)
  }

  window.addScaleEventListeners = addScaleEventListeners;
  window.removeScaleEventListeners = removeScaleEventListeners;
})();
