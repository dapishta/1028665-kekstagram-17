'use strict';

(function () {

  var uploadPopupTag = document.querySelector('.img-upload__overlay');

  var isArrayWithDublicates = function (array) {
    var counter = 0;
    for (var i = 0; i < array.length; i++) {
      for (var y = i + 1; y < array.length; y++) {
        if (array[i] === array[y]) {
          counter++;
        }
      }
    }
    if (counter > 0) {
      return true;
    } else {
      return false;
    }

  };

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


  var checkHashTags = function () {
    var uploadHashTagsInputTag = uploadPopupTag.querySelector('.text__hashtags');
    var hashTagsInputValue = uploadHashTagsInputTag.value;
    var errorMessage = '';

    if (hashTagsInputValue) {
      var hashTags = hashTagsInputValue.toLowerCase().split(' ');

      hashTags.forEach(function (element) {
        var numberOfHashes = checkNumberOfHashes(element);
        if (element.charAt(0) !== '#') {
          errorMessage = 'Пожалуйста, добавьте # в начало тега';
        } else if (element === '#') {
          errorMessage = 'Пожалуйста, удалите тег с пустой решеткой';
        } else if (numberOfHashes > 1) {
          errorMessage = 'Пожалуйста, разделите теги пробелами';
        } else if (hashTags.length > 5) {
          errorMessage = 'Пожалуйста, удалите ' + (hashTags.length - 5) + ' тег';
        } else if (element.length > 20) {
          errorMessage = 'Уменьшите количество знаков в "' + element + '" хештеге. Не может быть более 20 символов.';
        } else if (isArrayWithDublicates(hashTags)) {
          errorMessage = 'Пожалуйста, удалите одинаковые теги';
        }
      });
    }

    return errorMessage;
  };

  var setCustomValidity = function (error) {
    var uploadHashTagsInputTag = uploadPopupTag.querySelector('.text__hashtags');
    uploadHashTagsInputTag.setCustomValidity(error);
  };

  window.checkHashTags = checkHashTags;
  window.setCustomValidity = setCustomValidity;
})();
