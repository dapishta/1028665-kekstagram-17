'use strict';

(function () {

  var utils = window.utils;
  var removeClass = utils.removeClass;
  var removeChildren = utils.removeChildren;
  var addClass = utils.addClass;
  var showComments = window.showComments;
  var previewPopupTag = document.querySelector('.big-picture');
  var previewImgTag = previewPopupTag.querySelector('.big-picture__img img');
  var previewLikesTag = previewPopupTag.querySelector('.likes-count');
  var previewCaptionTag = previewPopupTag.querySelector('.social__caption');
  var previewCommentsCountTag = previewPopupTag.querySelector('.comments-count');
  var previewCommentsListTag = previewPopupTag.querySelector('.social__comments');
  var previewSocialCommentsCountTag = previewPopupTag.querySelector('.social__comment-count');
  var previewCloseBtnTag = previewPopupTag.querySelector('.big-picture__cancel');
  var bodyTag = document.getElementsByTagName('body')[0];
  var NUMBER_OF_COMMENTS_PORTION = 5;
  var removeThumbnailsEventListeners = window.removeThumbnailsEventListeners;
  var addThumbnailsEventListeners = window.addThumbnailsEventListeners;
  var photoListTag = document.querySelector('.pictures');
  var renderedPhotos = photoListTag.querySelectorAll('.picture');
  var thumbnailClick;
  var thumbnailPress;


  var getComments = window.getComments;


  var showPreview = function (data, thumbnailsClickEventListener, thumbnailsPressEventListener) {
    renderedPhotos = photoListTag.querySelectorAll('.picture');
    thumbnailClick = thumbnailsClickEventListener;
    thumbnailPress = thumbnailsPressEventListener;
    removeThumbnailsEventListeners(renderedPhotos, thumbnailsClickEventListener, thumbnailsPressEventListener);

    var fragment = document.createDocumentFragment();
    removeChildren('.social__comment', previewCommentsListTag);
    removeClass(previewPopupTag, 'hidden');
    addClass(previewSocialCommentsCountTag, 'visually-hidden');
    addClass(bodyTag, 'modal-open');

    previewImgTag.src = data.url;
    previewLikesTag.textContent = data.likes;
    previewCommentsCountTag.textContent = data.comments.length;
    previewCaptionTag.textContent = data.description;

    getComments(data.comments);
    showComments(NUMBER_OF_COMMENTS_PORTION);

    previewCommentsListTag.appendChild(fragment);
    previewCloseBtnTag.addEventListener('click', onPopupCloseBtnTagClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePreview = function () {
    addThumbnailsEventListeners(renderedPhotos, thumbnailClick, thumbnailPress);
    removeClass(bodyTag, 'modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
    previewCloseBtnTag.removeEventListener('click', onPopupCloseBtnTagClick);
    addClass(previewPopupTag, 'hidden');
  };

  var onPopupEscPress = function (evt) {
    utils.isEscEvent(evt, closePreview);
  };

  var onPopupCloseBtnTagClick = function () {
    closePreview();
  };

  window.showPreview = showPreview;

})();


