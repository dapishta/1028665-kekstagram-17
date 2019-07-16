'use strict';

(function () {

  var addThumbnailsEventListeners = function (array, clickEvent, pressEvent) {
    array.forEach(function (element) {
      element.addEventListener('click', clickEvent);
      element.addEventListener('keydown', pressEvent);
    });
  };

  var removeThumbnailsEventListeners = function (array, clickEvent, pressEvent) {
    array.forEach(function (element) {
      element.removeEventListener('click', clickEvent);
      element.removeEventListener('keydown', pressEvent);
    });
  };

  window.removeThumbnailsEventListeners = removeThumbnailsEventListeners;
  window.addThumbnailsEventListeners = addThumbnailsEventListeners;

})();
