/* eslint-disable semi */
'use strict';


// Data
(function () {
  var utils = window.utils;
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

  var createMockData = function (numberOfItems) {
    var array = [];
    for (var i = 0; i < numberOfItems; i++) {

      // Comments. Get number of comments we want for a post. Create array for this post comments and fill this array with random comments.
      var numberOfComments = utils.getRandomNumber(0, comments.length - 1);
      var photoComments = [];
      for (var y = 0; y < numberOfComments; y++) {
        photoComments[y] = utils.getString(comments, 0, comments.length - 1);
      }
      // Likes. Get number.
      var numberOfLikes = utils.getRandomNumber(200, 15);

      // Get number for name
      var randomName = utils.getString(names, 0, names.length - 1);

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
  window.createMockData = createMockData;
})();
