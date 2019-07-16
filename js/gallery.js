'use strict';

(function () {
  var showFilters = window.showFilters;
  var updatePhotosList = window.updatePhotosList;
  var getPhotosData = window.getPhotosData;

  var onSuccess = function (data) {
    getPhotosData(data);
    showFilters();
    updatePhotosList('popular');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(onSuccess, onError);


})();
