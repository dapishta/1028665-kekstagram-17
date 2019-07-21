'use strict';

(function () {

  var utils = window.utils;
  var addScaleEventListeners = window.addScaleEventListeners;
  var save = window.save;
  var getDefaultFilter = window.getDefaultFilter;
  var showResultPopup = window.showResultPopup;
  var getDefaultImgFilter = window.getDefaultImgFilter;
  var updateScale = window.updateScale;
  var setCustomValidity = window.setCustomValidity;

  var uploadBtnTag = document.querySelector('#upload-file');
  var uploadPopupTag = document.querySelector('.img-upload__overlay');
  var uploadedImgTag = uploadPopupTag.querySelector('.img-upload__preview img');
  var uploadCancelBtnTag = uploadPopupTag.querySelector('.img-upload__cancel');
  var uploadForm = document.querySelector('.img-upload__form');
  var addFiltersEventListeners = window.addFiltersEventListeners;
  var removeScaleEventListeners = window.removeScaleEventListeners;
  var uploadDescriptionInputTag = uploadPopupTag.querySelector('.text__description');
  var uploadHashTagsInputTag = uploadPopupTag.querySelector('.text__hashtags');
  var saveBtnTag = uploadPopupTag.querySelector('.img-upload__submit');

  var openPopup = function () {
    utils.removeClass(uploadPopupTag, 'hidden');
    document.addEventListener('keydown', onPopupEscPress);
    uploadCancelBtnTag.addEventListener('click', onPopupCancelTagClick);
    uploadForm.addEventListener('focusin', function () {
      document.removeEventListener('keydown', onPopupEscPress);
    });

    uploadForm.addEventListener('focusout', function () {
      document.addEventListener('keydown', onPopupEscPress);
    });

    uploadForm.addEventListener('submit', onSaveBtnTagSubmit);
    saveBtnTag.addEventListener('click', onSaveBtnTagClick);
    saveBtnTag.addEventListener('keydown', onSaveBtnTagPress);
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
    getDefaultImgFilter();
    getDefaultFilter();
    updateScale(100);
  };

  var onPopupCancelTagClick = function () {
    closePopup();
  };

  var onPopupEscPress = function (evt) {
    utils.isEscEvent(evt, closePopup);
  };

  var onUploadBtnTagClick = function () {
    openPopup();
    uploadedImgTag.src = window.URL.createObjectURL(uploadBtnTag.files[0]);
  };

  uploadBtnTag.addEventListener('change', onUploadBtnTagClick);

  var checkCustomValidity = function () {
    setCustomValidity();
  };
  var onSaveBtnTagClick = function () {
    checkCustomValidity();
  };

  var onSaveBtnTagPress = function (evt) {
    utils.isEnterEvent(evt, checkCustomValidity);
  };


  var onSaveBtnTagSubmit = function (evt) {
    evt.preventDefault();
    save(new FormData(uploadForm), onSaveSuccess, onSaveError);
  };


  var onSaveSuccess = function () {
    closePopup();
    showResultPopup('success');
  };

  var onSaveError = function () {
    closePopup();
    showResultPopup('error');
  };
})();
// Constants

