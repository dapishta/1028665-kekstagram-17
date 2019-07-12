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


  var likesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var savePhotos = function (data) {
    photos = data;
  }

  var updatePhotosList = function () {
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

      default:
        createdPhotosFragmentTag = createThumbnails(photos.length, photos);
    }

    insertTag(createdPhotosFragmentTag, photoListTag);
  };

  var showFilters = function () {
    removeClass(filtersListTag, 'img-filters--inactive');
    var debouncedUpdatePhotos = debounce(function () {
      updatePhotosList(photos)
    }, 500);

    filterPopularTag.addEventListener('click', function () {
      chosenFilter = 'popular';
      debouncedUpdatePhotos();
    });
    filterNewTag.addEventListener('click', function () {
      chosenFilter = 'new';
      debouncedUpdatePhotos();
    });
    filterDiscussedTag.addEventListener('click', function () {
      chosenFilter = 'discussed';
      debouncedUpdatePhotos();
    });
  }

  window.showFilters = showFilters;
  window.updatePhotosList = updatePhotosList;
  window.savePhotos = savePhotos;
})();
