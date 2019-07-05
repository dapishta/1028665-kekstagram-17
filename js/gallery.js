/* eslint-disable semi */
'use strict';

(function () {
  var NUMBER_OF_PHOTOS = 25;
  var utils = window.utils;
  var insertTag = utils.insertTag;
  var createThumbnails = window.createThumbnails;


  var onSuccess = function (photos) {
    var photoListTag = document.querySelector('.pictures');
    var createdPhotosFragmentTag = createThumbnails(NUMBER_OF_PHOTOS, photos);
    insertTag(createdPhotosFragmentTag, photoListTag);
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
