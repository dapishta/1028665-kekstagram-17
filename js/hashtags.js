/* eslint-disable semi */
'use strict';

(function () {

  var uploadPopupTag = document.querySelector('.img-upload__overlay');

  var checkHashTags = function () {
    var uploadHashTagsInputTag = uploadPopupTag.querySelector('.text__hashtags');
    var hashTagsInputValue = uploadHashTagsInputTag.value;

    if (uploadHashTagsInputTag) {
      var hashTags = hashTagsInputValue.toLowerCase().split(' ');
      for (var i = 0; i < hashTags.length; i++) {
        var checkNumberOfHashes = function () {
          var dividedWord = hashTags[i].split('');
          var counter = 0;
          for (var z = 0; z < dividedWord.length; z++) {
            if (dividedWord[z] === '#') {
              counter++;
            }
          }
          return counter;
        }

        var checkSimilarityOfHashes = function () {
          var counter = 0;
          for (var c = 0; c < hashTags.length; c++) {
            if (hashTags[i] === hashTags[c]) {
              counter++
            }
          }
          return counter;
        }
        var numberOfHashes = checkNumberOfHashes();
        var numberOfSimilarities = checkSimilarityOfHashes();

        if (hashTags[i].charAt(0) !== '#') {
          uploadHashTagsInputTag.setCustomValidity('Пожалуйста, добавьте # в начало тега')
        } else if (hashTags[i] === '#') {
          uploadHashTagsInputTag.setCustomValidity('Пожалуйста, удалите тег с пустой решеткой')
        } else if (numberOfHashes > 1) {
          uploadHashTagsInputTag.setCustomValidity('Пожалуйста, разделите теги пробелами')
        } else if (numberOfSimilarities > 1) {
          uploadHashTagsInputTag.setCustomValidity('Пожалуйста, удалите повторяющийся тег')
        } else if (hashTags.length > 5) {
          uploadHashTagsInputTag.setCustomValidity('Пожалуйста, удалите ' + (hashTags.length - 5) + ' тег')
        } else if (hashTags[i].length > 20) {
          uploadHashTagsInputTag.setCustomValidity('Уменьшите количество знаков в "' + hashTags[i] + '" хештеге. Не может быть более 20 символов.')
        } else {
          uploadHashTagsInputTag.setCustomValidity('');
        }
      }

    }
  }

  window.checkHashTags = checkHashTags;
})();
