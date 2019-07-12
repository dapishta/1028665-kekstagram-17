/* eslint-disable semi */
'use strict';

(function () {

  var utils = window.utils;
  var addScaleEventListeners = window.addScaleEventListeners;
  var checkHashTags = window.checkHashTags;
  var save = window.save;
  var getDefaultFilter = window.getDefaultFilter;

  // Pop-up
  var uploadBtnTag = document.querySelector('#upload-file');
  var uploadPopupTag = document.querySelector('.img-upload__overlay');
  var uploadedImgTag = uploadPopupTag.querySelector('.img-upload__preview img');
  var uploadCancelBtnTag = uploadPopupTag.querySelector('.img-upload__cancel');
  var uploadForm = document.querySelector('.img-upload__form');
  var addFiltersEventListeners = window.addFiltersEventListeners;
  var removeScaleEventListeners = window.removeScaleEventListeners;
  var uploadDescriptionInputTag = uploadPopupTag.querySelector('.text__description');
  var uploadHashTagsInputTag = uploadPopupTag.querySelector('.text__hashtags');
  // var uploadSubmitBtnTag = uploadPopupTag.querySelector('.img-upload__submit');

  // Open and close popup
  var openPopup = function () {
    utils.removeClass(uploadPopupTag, 'hidden');
    document.addEventListener('keydown', onPopupEscPress);
    uploadCancelBtnTag.addEventListener('click', onPopupCancelTagClick);
    uploadForm.addEventListener('focusin', function () {
      document.removeEventListener('keydown', onPopupEscPress);
    });

    uploadHashTagsInputTag.addEventListener('input', function () {
      checkHashTags();
    });
    uploadForm.addEventListener('focusout', function () {
      document.addEventListener('keydown', onPopupEscPress);
    });

    uploadForm.addEventListener('submit', onSaveBtnTagSubmit);

    addScaleEventListeners();
    addFiltersEventListeners();
  };

  var closePopup = function () {
    utils.addClass(uploadPopupTag, 'hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadBtnTag.value = '';
    uploadHashTagsInputTag.value = '';
    uploadDescriptionInputTag.value = '';
    removeScaleEventListeners();
  };

  // Handlers
  var onPopupCancelTagClick = function () {
    closePopup();
  };

  var onPopupEscPress = function (evt) {
    utils.isEscEvent(evt, closePopup);
  };

  var onUploadBtnTagClick = function () {
    openPopup();
    uploadedImgTag.src = window.URL.createObjectURL(uploadBtnTag.files[0])
  };

  uploadBtnTag.addEventListener('change', onUploadBtnTagClick);

  // Saving

  var onSaveBtnTagSubmit = function (evt) {
    evt.preventDefault();
    checkHashTags();
    save(new FormData(uploadForm), onSaveSuccess, onSaveError);

  };

  var onSaveSuccess = function () {
    closePopup();
    getDefaultFilter();
  };

  var onSaveError = function () {
    var errorPopup = document.querySelector('#error').content;
    var main = document.getElementsByTagName('main')[0];

    main.appendChild(errorPopup);
    var insertedError = document.querySelector('.error');

    var onOutsidePopupClick = function (evt) {
      if (evt.target === insertedError) {
        main.removeChild(insertedError);
      }
    }
    insertedError.addEventListener('click', onOutsidePopupClick);

    var closeError = function () {
      main.removeChild(insertedError);
    }

    var errorBtn = document.querySelector('.error__button');
    errorBtn.addEventListener('click', function () {
      closeError();
    })

    var onErrorEscPress = function (evt) {
      utils.isEscEvent(evt, closeError);
    };
    document.addEventListener('keydown', onErrorEscPress);

  }
})();
// Constants

