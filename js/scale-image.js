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
  var getNewStepperValue = function (isPositive) {
    var inputTagValue = scaleInputTag.value;
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
    scaleInputTag.setAttribute('value', number);
    var cssScale = number / 100;
    uploadedImgTag.style.transform = 'scale(' + cssScale + ')';
  }

  var addScaleEventListeners = function () {
    scaleBtnSmallerTag.addEventListener('click', function () {
      updateScale(getNewStepperValue(false));
    })
    scaleBtnBiggerTag.addEventListener('click', function () {
      updateScale(getNewStepperValue(true));
    })
  }

  window.addScaleEventListeners = addScaleEventListeners;

})();
