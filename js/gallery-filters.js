'use strict';

(function () {
  var utils = window.utils;
  var isEnterEvent = utils.isEnterEvent;
  var addClass = utils.addClass;
  var removeClass = utils.removeClass;
  var updatePhotosList = window.updatePhotosList;
  var filtersListTag = document.querySelector('.img-filters');
  var filterPopularTag = filtersListTag.querySelector('#filter-popular');
  var filterNewTag = filtersListTag.querySelector('#filter-new');
  var filterDiscussedTag = filtersListTag.querySelector('#filter-discussed');

  var showFilters = function () {
    removeClass(filtersListTag, 'img-filters--inactive');

    filterPopularTag.addEventListener('click', function () {
      removeClass(filterNewTag, 'img-filters__button--active');
      removeClass(filterDiscussedTag, 'img-filters__button--active');
      addClass(filterPopularTag, 'img-filters__button--active');
      updatePhotosList('popular');
    });

    filterPopularTag.addEventListener('keydown', function (evt) {
      isEnterEvent(evt, function () {
        removeClass(filterNewTag, 'img-filters__button--active');
        removeClass(filterDiscussedTag, 'img-filters__button--active');
        addClass(filterPopularTag, 'img-filters__button--active');
        updatePhotosList('popular');
      });
    });

    filterNewTag.addEventListener('click', function () {
      updatePhotosList('new');
      removeClass(filterPopularTag, 'img-filters__button--active');
      removeClass(filterDiscussedTag, 'img-filters__button--active');
      addClass(filterNewTag, 'img-filters__button--active');
    });
    filterNewTag.addEventListener('keydown', function (evt) {
      isEnterEvent(evt, function () {
        updatePhotosList('new');
        removeClass(filterPopularTag, 'img-filters__button--active');
        removeClass(filterDiscussedTag, 'img-filters__button--active');
        addClass(filterNewTag, 'img-filters__button--active');
      });

    });
    filterDiscussedTag.addEventListener('click', function () {
      updatePhotosList('discussed');
      removeClass(filterPopularTag, 'img-filters__button--active');
      removeClass(filterNewTag, 'img-filters__button--active');
      addClass(filterDiscussedTag, 'img-filters__button--active');
    });

    filterDiscussedTag.addEventListener('keydown', function (evt) {
      isEnterEvent(evt, function () {
        updatePhotosList('discussed');
        removeClass(filterPopularTag, 'img-filters__button--active');
        removeClass(filterNewTag, 'img-filters__button--active');
        addClass(filterDiscussedTag, 'img-filters__button--active');
      });
    });
  };

  var getDefaultFilter = function () {
    updatePhotosList('popular');
  };

  window.showFilters = showFilters;
  window.updatePhotosList = updatePhotosList;
  window.getDefaultFilter = getDefaultFilter;
})();
