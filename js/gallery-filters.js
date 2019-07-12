/* eslint-disable semi */
'use strict';


(function () {
  var utils = window.utils;
  var removeClass = utils.removeClass;
  var removeChildren = utils.removeChildren;
  var getRandomNumber = utils.getRandomNumber;
  var debounce = utils.debounce;
  var insertTag = utils.insertTag;
  var createThumbnails = window.createThumbnails;
  var filtersListTag = document.querySelector('.img-filters');
  var filterPopularTag = filtersListTag.querySelector('#filter-popular');
  var filterNewTag = filtersListTag.querySelector('#filter-new');
  var filterDiscussedTag = filtersListTag.querySelector('#filter-discussed');
  var photoListTag = document.querySelector('.pictures');
  var chosenFilter = 'popular';
  var photos;
  var newPhotos = [];
  var discussedPhotos = [];
  var createdPhotosFragmentTag;
  var showPreview = window.showPreview;


  var likesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var findPhoto = function (address) {
    for (var i = 0; i < photos.length; i++) {
      if (photos[i].url === address) {
        return photos[i];
      }
    }
    return '-1';
  };

  var onThumbnailClick = function (evt) {
    var clickedThumbnailAddress = evt.target.getAttribute('src');
    var foundPhoto = findPhoto(clickedThumbnailAddress);
    showPreview(foundPhoto);

  };

  var updatePhotosList = function (data) {

    photos = data;
    removeChildren('.picture', photoListTag);

    switch (chosenFilter) {
      case 'discussed':
        discussedPhotos = photos
          .concat([])
          .sort(function (left, right) {
            var difference = right.comments.length - left.comments.length;
            if (difference === 0) {
              difference = likesComparator(left.likes, right.likes);
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
    for (var i = 0; i < renderedPhotos.length; i++) {
      renderedPhotos[i].addEventListener('click', onThumbnailClick);
    }
  };


  var showFilters = function () {
    removeClass(filtersListTag, 'img-filters--inactive');

    filterPopularTag.addEventListener('click', function () {
      chosenFilter = 'popular';
      debounce(updatePhotosList, 500, photos);
    });
    filterNewTag.addEventListener('click', function () {
      chosenFilter = 'new';
      debounce(updatePhotosList, 500, photos);
    });
    filterDiscussedTag.addEventListener('click', function () {
      chosenFilter = 'discussed';
      debounce(updatePhotosList, 500, photos);
    });
  };

  var getDefaultFilter = function () {
    chosenFilter = 'popular';
    updatePhotosList(photos);
  };

  window.showFilters = showFilters;
  window.updatePhotosList = updatePhotosList;
  window.getDefaultFilter = getDefaultFilter;
})();
