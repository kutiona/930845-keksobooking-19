'use strict';

var ADS_QUANTITY = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var START_LOCATION_X = 0;
var END_LOCATION_X = 1200;
var START_LOCATION_Y = 130;
var END_LOCATION_Y = 630;
var MAX_OFFER_PRICES = 10000;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAX_OFFER_ROOMS = 4;
var MAX_OFFER_GUESTS = 8;
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Функция генерации случайного целого числа
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var getRandomValue = function (data) {
  var randomValue = Math.floor(Math.random() * data.length);
  return data[randomValue];
};

var getRandomNumber = function (num) {
  var randomIndex = Math.floor(Math.random() * num);
  return randomIndex;
};

// Функция генерации массива строк случайной длины
function getRandomArray(arr) {
  var randomArray = [];
  var copyArray = [];
  for (var i = 0; i < arr.length; i++) {
    copyArray[i] = arr[i];
  }
  var randomArrayLength = getRandomInteger(1, arr.length);
  for (i = 0; i < randomArrayLength; i++) {
    var randomIndex = getRandomNumber(copyArray.length);

    randomArray[i] = copyArray[randomIndex];
    copyArray.splice(randomIndex, 1);
  }
  return randomArray;
}

// функция генерации случайных данных
var generateAds = function (quantity) {
  var ads = [];
  for (var i = 0; i < quantity; i++) {
    var locationX = getRandomInteger(START_LOCATION_X, END_LOCATION_X);
    var locationY = getRandomInteger(START_LOCATION_Y, END_LOCATION_Y);

    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Заголовок предложения' + (i + 1),
        'address': 'location_x' + ', ' + 'location_y',
        'price': getRandomInteger(0, MAX_OFFER_PRICES),
        'type': getRandomValue(OFFER_TYPES),
        'rooms': getRandomInteger(1, MAX_OFFER_ROOMS),
        'guests': getRandomInteger(1, MAX_OFFER_GUESTS),
        'checkin': getRandomValue(OFFER_CHECKINS),
        'checkout': getRandomValue(OFFER_CHECKOUTS),
        'features': getRandomArray(OFFER_FEATURES),
        'description': 'Строка с описанием' + (i + 1),
        'photos': 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg'
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };

    ads[i] = ad;
  }

  return ads;
};

// функция создания DOM-элемента на основе JS-объекта
var renderPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = ad.location.x - PIN_WIDTH + 'px';
  pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;

  return pinElement;
};

// функцию заполнения блока DOM-элементами на основе массива JS-объектов
var insertPins = function (ads) {

  var fragment = document.createDocumentFragment();

  for (var j = 0; j < ads.length; j++) {
    var pinItem = renderPin(ads[j]);
    fragment.appendChild(pinItem);
  }
  return fragment;
};

pinList.append(insertPins(generateAds(ADS_QUANTITY)));
