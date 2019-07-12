/* eslint-disable semi */
'use strict';

(function () {
  var showFilters = window.showFilters;
  var updatePhotosList = window.updatePhotosList;
  var savePhotos = window.savePhotos;


  var onSuccess = function (data) {
    showFilters();
    savePhotos(data);
    updatePhotosList();
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
