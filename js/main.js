/* eslint-disable semi */
'use strict';

// Tags
var NUMBER_OF_PHOTOS = 25;

// Data
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var names = [
  'Николай',
  'Степан',
  'Виктор',
  'Настя',
  'Вика',
  'Костя',
  'Афоня',
  'Виктор',
  'Станислав',
  'Стас'
];


// Create random number from min max range.

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min)
};


// Get a string from array.
var getString = function (array, min, max) {
  var randomNumber = Math.round(Math.random() * (max - min) + min);
  return array[randomNumber];
};


// Create mock data

var createMockData = function (numberOfItems) {
  var array = [];

  for (var i = 0; i < numberOfItems; i++) {
    // Comments. Get number of comments we want for a post. Create array for this post comments and fill this array with random comments.
    var numberOfComments = getRandomNumber(0, comments.length - 1);
    var photoComments = [];
    for (var y = 0; y < numberOfComments; y++) {
      photoComments[y] = getString(comments, 0, comments.length - 1);
    }

    // Likes. Get number.
    var numberOfLikes = getRandomNumber(200, 15);

    // Get number for name
    var randomName = getString(names, 0, names.length - 1);

    // Fill the data object with details
    array[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: numberOfLikes,
      comment: photoComments,
      name: randomName
    };
  }
  return array;
};

// Create DOM Elements
var createDOMElements = function (array) {

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

// Insert tag inside other tag
var insertTag = function (tagToBeInserted, tagWhereToInsert) {
  tagWhereToInsert.appendChild(tagToBeInserted);
};

// Execute all

var renderPhotos = function (numberOfPhotos) {
  var photoListTag = document.querySelector('.pictures');
  var photos = createMockData(numberOfPhotos);
  var createdPhotosFragmentTag = createDOMElements(photos);
  insertTag(createdPhotosFragmentTag, photoListTag);
};

renderPhotos(NUMBER_OF_PHOTOS);
