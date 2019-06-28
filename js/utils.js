/* eslint-disable semi */
'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    removeClass: function (tag, className) {
      tag.classList.remove(className);
    },
    addClass: function (tag, className) {
      tag.classList.add(className);
    },
    getRandomNumber: function (min, max) {
      return Math.round(Math.random() * (max - min) + min)
    },
    getString: function (array, min, max) {
      var randomNumber = Math.round(Math.random() * (max - min) + min);
      return array[randomNumber];
    },
    insertTag: function (tagToBeInserted, tagWhereToInsert) {
      tagWhereToInsert.appendChild(tagToBeInserted);
    }
  }

  window.utils = utils;

})();
