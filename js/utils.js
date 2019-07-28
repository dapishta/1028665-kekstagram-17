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
      return Math.round(Math.random() * (max - min) + min);
    },
    insertTag: function (tagToBeInserted, tagWhereToInsert) {
      tagWhereToInsert.appendChild(tagToBeInserted);
    },
    removeChildren: function (childrenClassName, parentTag) {
      var children = parentTag.querySelectorAll(childrenClassName);
      for (var i = 0; i < children.length; i++) {
        parentTag.removeChild(children[i]);
      }

    }
  };

  window.utils = utils;

})();
