'use strict';

(function () {
  var utils = window.utils;
  var addClass = utils.addClass;
  var removeClass = utils.removeClass;
  var getRandomNumber = utils.getRandomNumber;
  var comments;
  var commentsToDisplay;
  var previewPopupTag = document.querySelector('.big-picture');
  var previewCommentsListTag = previewPopupTag.querySelector('.social__comments');
  var commentsLoaderBtnTag = previewPopupTag.querySelector('.social__comments-loader');


  var getComments = function (data) {
    comments = data;
    commentsToDisplay = comments.concat();
  };

  var renderComment = function (data) {
    var comment = document.createElement('li');
    comment.classList.add('social__comment');
    var picture = document.createElement('img');
    picture.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    picture.alt = data.name;
    picture.classList.add('social__picture');
    comment.appendChild(picture);
    var text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = data.message;
    comment.appendChild(text);
    return comment;
  };

  var showComments = function (number) {
    var loadedPortion = document.createDocumentFragment();
    var indexToRemove = 0;
    var itemsToAdd = number;
    if (commentsToDisplay.length < number) {
      itemsToAdd = commentsToDisplay.length;
    }
    for (var i = 0; i < itemsToAdd; i++) {
      var createdComment = renderComment(commentsToDisplay[i]);
      loadedPortion.appendChild(createdComment);
    }
    previewCommentsListTag.appendChild(loadedPortion);
    commentsToDisplay.splice(indexToRemove, itemsToAdd);

    if (commentsToDisplay.length < 1) {
      addClass(commentsLoaderBtnTag, 'hidden');
    } else {
      removeClass(commentsLoaderBtnTag, 'hidden');
    }
  };

  var onCommentsLoaderTagClick = function () {
    showComments(commentsToDisplay.length);
  };

  commentsLoaderBtnTag.addEventListener('click', onCommentsLoaderTagClick);

  window.getComments = getComments;
  window.showComments = showComments;

})();
