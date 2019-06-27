/* eslint-disable semi */
'use strict';

(function () {

  var utils = window.utils;
  var addScaleEventListeners = window.addScaleEventListeners;

  // Pop-up
  var uploadBtnTag = document.querySelector('#upload-file');
  var uploadPopupTag = document.querySelector('.img-upload__overlay');
  var uploadedImgTag = uploadPopupTag.querySelector('.img-upload__preview img');
  var uploadCancelBtnTag = uploadPopupTag.querySelector('.img-upload__cancel');
  var uploadForm = document.querySelector('.img-upload__form');
  var addFiltersEventListeners = window.addFiltersEventListeners;

  // Open and close popup
  var openPopup = function () {
    utils.removeClass(uploadPopupTag, 'hidden');
    document.addEventListener('keydown', onPopupEscPress);
    uploadCancelBtnTag.addEventListener('click', onPopupCancelTagClick);
    uploadForm.addEventListener('focusin', function () {
      document.removeEventListener('keydown', onPopupEscPress);
    })
    uploadForm.addEventListener('focusout', function () {
      document.addEventListener('keydown', onPopupEscPress);
    })
    addScaleEventListeners();
    addFiltersEventListeners();
  };

  var closePopup = function () {
    utils.addClass(uploadPopupTag, 'hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadBtnTag.value = '';
  };

  // Handlers
  var onPopupCancelTagClick = function () {
    closePopup();
  }

  var onPopupEscPress = function (evt) {
    utils.isEscEvent(evt, closePopup);
  }

  var onUploadBtnTagClick = function () {
    openPopup();
    uploadedImgTag.src = window.URL.createObjectURL(uploadBtnTag.files[0])
  };

  uploadBtnTag.addEventListener('change', onUploadBtnTagClick);

})();
// Constants

