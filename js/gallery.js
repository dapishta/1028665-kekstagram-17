/* eslint-disable semi */
'use strict';

(function () {
  var NUMBER_OF_PHOTOS = 25;
  var utils = window.utils;
  var createMockData = window.createMockData;
  var insertTag = utils.insertTag;
  var createThumbnails = window.createThumbnails;

  var renderPhotos = function (numberOfPhotos) {
    var photoListTag = document.querySelector('.pictures');
    var photos = createMockData(numberOfPhotos);
    var createdPhotosFragmentTag = createThumbnails(photos);
    insertTag(createdPhotosFragmentTag, photoListTag);
  };

  renderPhotos(NUMBER_OF_PHOTOS);

})();
