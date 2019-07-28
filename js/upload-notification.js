'use strict';

(function () {
  var utils = window.utils;

  var showResultPopup = function (result) {
    var resultPopup = document.querySelector('#' + result + '').content.cloneNode(true);
    var main = document.getElementsByTagName('main')[0];
    main.appendChild(resultPopup);

    var insertedPopup = document.querySelector('.' + result + '');
    var onOutsidePopupClick = function (evt) {
      if (evt.target === insertedPopup) {
        main.removeChild(insertedPopup);
      }
    };

    insertedPopup.addEventListener('click', onOutsidePopupClick);

    var close = function () {
      main.removeChild(insertedPopup);
      insertedPopup.removeEventListener('click', onOutsidePopupClick);
    };

    var closeBtn = document.querySelector('.' + result + '__button');

    closeBtn.addEventListener('click', function () {
      close();
    });

    var onEscPress = function (evt) {
      utils.isEscEvent(evt, close);
    };

    document.addEventListener('keydown', onEscPress);
  };
  window.showResultPopup = showResultPopup;
})();
