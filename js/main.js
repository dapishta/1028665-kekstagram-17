// Tags
var PHOTO_LIST_TAG = document.querySelector(".pictures");
var PHOTO_ITEM_TAG = document
  .querySelector("#picture")
  .content.querySelector(".picture");
var PHOTO_ITEM_IMG_TAG = PHOTO_ITEM_TAG.querySelector(".picture__img");
var PHOTO_ITEM_LIKES_TAG = PHOTO_ITEM_TAG.querySelector(".picture__likes");
var PHOTO_ITEM_COMMENTS_TAG = PHOTO_ITEM_TAG.querySelector(
  ".picture__comments"
);

// Data
var comments = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];

var names = [
  "Николай",
  "Степан",
  "Виктор",
  "Настя",
  "Вика",
  "Костя",
  "Афоня",
  "Виктор",
  "Станислав",
  "Стас"
];

// Functions

// Create random number from to. User can enter one or two number in ascending or descending order.

var getRandomNumber = function(numFirst, numSecond) {
  var result = -Infinity;
  if (numSecond) {
    if (numFirst <= numSecond) {
      while (result < numFirst) {
        result = Math.round(Math.random() * numSecond);
      }
    } else {
      while (result < numSecond) {
        result = Math.round(Math.random() * numFirst);
      }
    }
  } else {
    result = Math.round(Math.random() * numFirst);
  }
  return result;
};

// Create data object

var createDataObject = function(numberOfItems, nameOfTheArrayToBeFilled) {
  for (var i = 0; i < numberOfItems; i++) {
    // Comments. Get number of comments we want for a post. Create array for this post comments and fill this array with random comments.
    var numberOfComments = getRandomNumber(0, comments.length - 1);
    var randomComments = [];
    for (var y = 0; y < numberOfComments; y++) {
      var randomComment = getRandomNumber(i, comments.length - 1);
      randomComments[y] = comments[randomComment];
    }

    // Likes. Get number.
    var numberOfLikes = getRandomNumber(200, 15);

    // Get number for name
    var randomName = getRandomNumber(names.length - 1, i);

    // Fill the data object with details
    nameOfTheArrayToBeFilled[i] = {
      url: "photos/" + (i + 1) + ".jpg",
      likes: numberOfLikes,
      comment: randomComments,
      name: names[randomName]
    };
  }
};

// Create DOM Elements
var createDOMElements = function(array, fragment) {
  for (var i = 0; i < array.length; i++) {
    PHOTO_ITEM_IMG_TAG.src = array[i].url;
    PHOTO_ITEM_LIKES_TAG.textContent = array[i].likes;
    for (var u = 0; u < array[i].comment.length; u++) {
      PHOTO_ITEM_COMMENTS_TAG.textContent += array[i].comment[u];
    }
    fragment.appendChild(PHOTO_ITEM_TAG.cloneNode(true));
  }
};

// Show elements in browser
var renderFragment = function(tagToInsert, fragment) {
  tagToInsert.appendChild(fragment);
};

// Execute all

var renderPhotos = function(numberOfPhotos) {
  var photosData = [];
  var fragment = document.createDocumentFragment();
  createDataObject(numberOfPhotos, photosData);
  createDOMElements(photosData, fragment);
  renderFragment(PHOTO_LIST_TAG, fragment);
};

renderPhotos(25);
