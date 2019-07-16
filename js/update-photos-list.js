'use strict';

(function () {
  var utils = window.utils;
  var isEnterEvent = utils.isEnterEvent;
  var removeChildren = utils.removeChildren;
  var getRandomNumber = utils.getRandomNumber;
  var insertTag = utils.insertTag;
  var createThumbnails = window.createThumbnails;
  var addThumbnailsEventListeners = window.addThumbnailsEventListeners;
  var photos;
  var newPhotos = [];
  var discussedPhotos = [];
  var createdPhotosFragmentTag;
  var photoListTag = document.querySelector('.pictures');
  var showPreview = window.showPreview;

  var getPhotosData = function (data) {
    photos = data;
  };

  var findPhoto = function (address) {
    for (var i = 0; i < photos.length; i++) {
      if (photos[i].url === address) {
        return photos[i];
      }
    }
    return '-1';
  };

  var renderPressedImg = function (src) {
    var foundPressedPhoto = findPhoto(src);
    showPreview(foundPressedPhoto, onThumbnailClick, onThumbnailPress);
  };

  var onThumbnailPress = function (evt) {
    var src = evt.path[0].firstElementChild.attributes[1].nodeValue;
    isEnterEvent(evt, function () {
      renderPressedImg(src);
    });
  };

  var onThumbnailClick = function (evt) {
    var clickedThumbnailSrc = evt.target.getAttribute('src');
    var foundClickedPhoto = findPhoto(clickedThumbnailSrc);
    showPreview(foundClickedPhoto, onThumbnailClick, onThumbnailPress);
  };

  var updatePhotosList = function (filter) {

    removeChildren('.picture', photoListTag);

    switch (filter) {
      case 'discussed':
        discussedPhotos = photos
          .concat([])
          .sort(function (left, right) {
            var difference = right.comments.length - left.comments.length;
            if (difference === 0) {
              difference = right.likes - left.likes;
            }
            return difference;
          });
        createdPhotosFragmentTag = createThumbnails(discussedPhotos.length, discussedPhotos);
        break;

      case 'new':
        var randomMinNumber = getRandomNumber(0, photos.length - 10);
        var NEW_PHOTOS_NUMBER = 10;
        newPhotos = photos.slice(randomMinNumber, randomMinNumber + NEW_PHOTOS_NUMBER);
        createdPhotosFragmentTag = createThumbnails(newPhotos.length, newPhotos);
        break;

      case 'popular':
        createdPhotosFragmentTag = createThumbnails(photos.length, photos);
    }
    insertTag(createdPhotosFragmentTag, photoListTag);
    var renderedPhotos = photoListTag.querySelectorAll('.picture');
    addThumbnailsEventListeners(renderedPhotos, onThumbnailClick, onThumbnailPress);
  };


  window.getPhotosData = getPhotosData;
  window.updatePhotosList = updatePhotosList;

})();
