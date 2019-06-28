/* eslint-disable semi */
'use strict';

(function () {

  var createThumbnails = function (array) {
    var photoItemTag = document
      .querySelector('#picture')
      .content.querySelector('.picture');
    var photoItemImgTag = photoItemTag.querySelector('.picture__img');
    var photoItemLikesTag = photoItemTag.querySelector('.picture__likes');
    var photoItemCommentsTag = photoItemTag.querySelector('.picture__comments');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      photoItemImgTag.src = array[i].url;
      photoItemLikesTag.textContent = array[i].likes;
      for (var u = 0; u < array[i].comment.length; u++) {
        photoItemCommentsTag.textContent = array[i].comment.length;
      }
      fragment.appendChild(photoItemTag.cloneNode(true));
    }
    return fragment;
  };

  window.createThumbnails = createThumbnails;

})();
