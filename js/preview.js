/* eslint-disable semi */
'use strict';

(function () {

  var utils = window.utils;
  var removeClass = utils.removeClass;
  var getRandomNumber = utils.getRandomNumber;
  var addClass = utils.addClass;
  var previewPopupTag = document.querySelector('.big-picture');
  var previewImgTag = previewPopupTag.querySelector('.big-picture__img img');
  var previewLikesTag = previewPopupTag.querySelector('.likes-count');
  var previewCaptionTag = previewPopupTag.querySelector('.social__caption');
  var previewCommentsCountTag = previewPopupTag.querySelector('.comments-count');
  var previewCommentsListTag = previewPopupTag.querySelector('.social__comments');
  var previewSocialCommentsCountTag = previewPopupTag.querySelector('.social__comment-count');
  var previewCommentsLoaderTag = previewPopupTag.querySelector('.comments-loader');

  var renderComment = function (data) {
    var comment = document.createElement('li');
    comment.classList.add('social__comment');
    var picture = document.createElement('img');
    picture.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    picture.alt = 'Аватар комментатора фотографии';
    picture.classList.add('social__picture');
    comment.appendChild(picture);
    var text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = data.message;
    comment.appendChild(text);
    return comment;
  }

  var showPreview = function (data) {
    var fragment = document.createDocumentFragment();
    removeClass(previewPopupTag, 'hidden');
    addClass(previewSocialCommentsCountTag, 'visually-hidden');
    addClass(previewCommentsLoaderTag, 'visually-hidden');

    previewImgTag.src = data[0].url;
    previewLikesTag.textContent = data[0].likes;
    previewCommentsCountTag.textContent = data[0].comments.length;
    previewCaptionTag.textContent = data[0].description;
    var comments = data[0].comments;

    for (var i = 0; i < data[0].comments.length; i++) {
      var createdComment = renderComment(comments[i]);
      fragment.appendChild(createdComment);
    }
    previewCommentsListTag.appendChild(fragment);

  }

  window.showPreview = showPreview;

})();


