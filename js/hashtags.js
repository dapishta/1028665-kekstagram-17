'use strict';

(function () {

  var uploadPopupTag = document.querySelector('.img-upload__overlay');

  var isArrayWithDublicates = function (array) {
    for (var i = 0; i < array.length; i++) {
      var counter = 0;

      for (var y = 0; y < array.length; y++) {
        if (array[i] === array[y]) {
          counter++;
        }
      }
    }
    if (counter > 0) {
      return true;
    }
    return false;
  };

  var checkHashTags = function () {
    var uploadHashTagsInputTag = uploadPopupTag.querySelector('.text__hashtags');
    var hashTagsInputValue = uploadHashTagsInputTag.value;

    if (uploadHashTagsInputTag.value) {
      var hashTags = hashTagsInputValue.toLowerCase().split(' ');

      var checkNumberOfHashes = function (hash) {
        var dividedWord = hash.split('');
        var counter = 0;

        dividedWord.forEach(function (letter) {
          if (letter === '#') {
            counter++;
          }
        });
        return counter;
      };

      hashTags.forEach(function (element) {
        var numberOfHashes = checkNumberOfHashes(element);

        if (element.charAt(0) !== '#') {
          uploadHashTagsInputTag.setCustomValidity('Пожалуйста, добавьте # в начало тега');
        } else if (element === '#') {
          uploadHashTagsInputTag.setCustomValidity('Пожалуйста, удалите тег с пустой решеткой');
        } else if (numberOfHashes > 1) {
          uploadHashTagsInputTag.setCustomValidity('Пожалуйста, разделите теги пробелами');
        } else if (hashTags.length > 5) {
          uploadHashTagsInputTag.setCustomValidity('Пожалуйста, удалите ' + (hashTags.length - 5) + ' тег');
        } else if (element.length > 20) {
          uploadHashTagsInputTag.setCustomValidity('Уменьшите количество знаков в "' + element + '" хештеге. Не может быть более 20 символов.');
        } else {
          uploadHashTagsInputTag.setCustomValidity('');
        }
      });
      if (isArrayWithDublicates(hashTags)) {
        uploadHashTagsInputTag.setCustomValidity('Пожалуйста, удалите одинаковые теги');
      } else {
        uploadHashTagsInputTag.setCustomValidity('');
      }
    }
  };

  window.checkHashTags = checkHashTags;
})();
