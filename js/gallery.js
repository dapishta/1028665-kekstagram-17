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
  var onError = function (error) {
    console.log(error);
  };

  window.load(onSuccess, onError);


})();
