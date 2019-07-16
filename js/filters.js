'use strict';

(function () {
  var utils = window.utils;
  var isEnterEvent = utils.isEnterEvent;
  var addThumbnailsEventListeners = window.addThumbnailsEventListeners;

  var uploadPopupTag = document.querySelector('.img-upload__overlay');
  var uploadedImgTag = uploadPopupTag.querySelector('.img-upload__preview img');
  var effectsListTag = uploadPopupTag.querySelector('.effects__list');

  var effectNoneTag = effectsListTag.querySelector('.effects__preview--none');
  var effectChromeTag = effectsListTag.querySelector('.effects__preview--chrome');
  var effectSepiaTag = effectsListTag.querySelector('.effects__preview--sepia');
  var effectMarvinTag = effectsListTag.querySelector('.effects__preview--marvin');
  var effectPhobosTag = effectsListTag.querySelector('.effects__preview--phobos');
  var effectHeatTag = effectsListTag.querySelector('.effects__preview--heat');

  var effectChromeStyle = 'effects__preview--chrome';
  var effectSepiaStyle = 'effects__preview--sepia';
  var effectMarvinStyle = 'effects__preview--marvin';
  var effectPhobosStyle = 'effects__preview--phobos';
  var effectHeatStyle = 'effects__preview--heat';

  var effectSliderTag = document.querySelector('.effect-level');
  var effectPinSliderTag = uploadPopupTag.querySelector('.effect-level__pin');
  var effectInputTag = document.querySelector('.effect-level__value');
  var effectLevelDepthTag = uploadPopupTag.querySelector('.effect-level__depth');
  var startCoordsPercentage = 100;
  var currentPinPercentage = 100;
  var currentFilter = false;


  if (!currentFilter) {
    utils.addClass(effectSliderTag, 'hidden');
  }

  var onFilterClick = function (evt) {
    if (evt.target === effectNoneTag) {
      utils.removeClass(uploadedImgTag, currentFilter);
      utils.addClass(effectSliderTag, 'hidden');
    }

    if (evt.target === effectChromeTag) {
      addFilter(effectChromeStyle);
    }

    if (evt.target === effectSepiaTag) {
      addFilter(effectSepiaStyle);
    }


    if (evt.target === effectMarvinTag) {
      addFilter(effectMarvinStyle);
    }

    if (evt.target === effectPhobosTag) {
      addFilter(effectPhobosStyle);
    }

    if (evt.target === effectHeatTag) {
      addFilter(effectHeatStyle);
    }
  };

  var onFilterPress = function (evt) {
    if (evt.target === effectNoneTag) {
      isEnterEvent(evt, function () {
        utils.removeClass(uploadedImgTag, currentFilter);
        utils.addClass(effectSliderTag, 'hidden');
      });
    }

    if (evt.target === effectChromeTag) {
      isEnterEvent(evt, function () {
        addFilter(effectChromeStyle);
      });
    }

    if (evt.target === effectSepiaTag) {
      isEnterEvent(evt, function () {
        addFilter(effectSepiaStyle);
      });
    }

    if (evt.target === effectMarvinTag) {
      isEnterEvent(evt, function () {
        addFilter(effectMarvinStyle);
      });
    }

    if (evt.target === effectPhobosTag) {
      isEnterEvent(evt, function () {
        addFilter(effectPhobosStyle);
      });
    }

    if (evt.target === effectHeatTag) {
      isEnterEvent(evt, function () {
        addFilter(effectHeatStyle);
      });
    }

  };

  var addFiltersEventListeners = function () {

    var filters = effectsListTag.querySelectorAll('.effects__item');
    addThumbnailsEventListeners(filters, function (evt) {
      onFilterClick(evt);
    }, function (evt) {
      onFilterPress(evt);
    });

    effectPinSliderTag.addEventListener('mousedown', function (evt) {
      var startCoordsX = evt.clientX;
      var effectSliderWidth = effectSliderTag.offsetWidth;

      var onMouseMove = function (moveEvt) {
        var shiftX = startCoordsX - moveEvt.clientX;
        var calculateShiftPercentage = function () {
          var number = shiftX * 100 / effectSliderWidth;
          return number.toFixed(2);
        };
        var shiftPercentage = calculateShiftPercentage();

        currentPinPercentage = startCoordsPercentage - shiftPercentage;
        if (currentPinPercentage < 0) {
          currentPinPercentage = 0;
        } else if (currentPinPercentage > 100) {
          currentPinPercentage = 100;
        }

        effectPinSliderTag.style.left = currentPinPercentage + '%';
        effectLevelDepthTag.style.width = currentPinPercentage + '%';
        startCoordsX = moveEvt.clientX;
        startCoordsPercentage = currentPinPercentage;
        effectInputTag.setAttribute('value', currentPinPercentage.toFixed(2));

        var calculateFilterStrength = function (min, max) {
          return (max - min) / 100 * currentPinPercentage + min;
        };

        if (currentFilter === effectChromeStyle) {
          uploadedImgTag.style.filter = 'grayscale(' + calculateFilterStrength(0, 1) + ')';
        }
        if (currentFilter === effectSepiaStyle) {
          uploadedImgTag.style.filter = 'sepia(' + calculateFilterStrength(0, 1) + ')';
        }
        if (currentFilter === effectMarvinStyle) {
          uploadedImgTag.style.filter = 'invert(' + calculateFilterStrength(0, 100) + '%)';
        }
        if (currentFilter === effectPhobosStyle) {
          uploadedImgTag.style.filter = 'blur(' + calculateFilterStrength(0, 3) + 'px)';
        }
        if (currentFilter === effectHeatStyle) {
          uploadedImgTag.style.filter = 'brightness(' + calculateFilterStrength(1, 3) + ')';
        }
      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  var addFilter = function (filter) {
    if (currentFilter) {
      utils.removeClass(uploadedImgTag, currentFilter);
      uploadedImgTag.style.filter = '';
      startCoordsPercentage = 100;
    }
    currentFilter = filter;
    utils.addClass(uploadedImgTag, filter);
    effectLevelDepthTag.style.width = '100%';
    effectPinSliderTag.style.left = '100%';
    utils.removeClass(effectSliderTag, 'hidden');
  };


  var getDefaultImgFilter = function () {
    utils.removeClass(uploadedImgTag, currentFilter);
    uploadedImgTag.style.filter = '';
    startCoordsPercentage = 100;
    utils.addClass(effectSliderTag, 'hidden');
    currentFilter = false;
  };

  window.addFiltersEventListeners = addFiltersEventListeners;
  window.getDefaultImgFilter = getDefaultImgFilter;
})();
