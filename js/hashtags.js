'use strict';

(function () {

  var uploadPopupTag = document.querySelector('.img-upload__overlay');

  var isArrayWithDublicates = function (array) {
    var result = false;
    array.forEach(function (element) {
      if (array.indexOf(element) !== array.lastIndexOf(element)) {
        result = true;
      }
    });
    return result;
  };

  var isHashMultiple = function (hash) {
    var result = false;
    if (hash.indexOf('#') !== hash.lastIndexOf('#')) {
      result = true;
    }
    return result;
  };


  var checkHashTags = function () {
    var uploadHashTagsInputTag = uploadPopupTag.querySelector('.text__hashtags');
    var hashTagsInputValue = uploadHashTagsInputTag.value;

    if (hashTagsInputValue) {
      var hashTags = hashTagsInputValue.toLowerCase().split(' ');

      if (hashTags.length > 5) {
        return 'Пожалуйста, удалите ' + (hashTags.length - 5) + ' тег';
      }

      if (isArrayWithDublicates(hashTags)) {
        return 'Пожалуйста, удалите одинаковые теги';
      }

      hashTags.forEach(function (element) {
        if (element.charAt(0) !== '#') {
          return 'Пожалуйста, добавьте # в начало тега';
        }
        if (element === '#') {
          return 'Пожалуйста, удалите тег с пустой решеткой';
        }
        if (isHashMultiple(element)) {
          return 'Пожалуйста, разделите теги пробелами';
        }

        if (element.length > 20) {
          return 'Уменьшите количество знаков в "' + element + '" хештеге. Не может быть более 20 символов.';
        }
        return '';

      });
    }
    return '';
  };

  var setCustomValidity = function () {
    var uploadHashTagsInputTag = uploadPopupTag.querySelector('.text__hashtags');
    uploadHashTagsInputTag.setCustomValidity(checkHashTags());
  };


  window.setCustomValidity = setCustomValidity;
})();
