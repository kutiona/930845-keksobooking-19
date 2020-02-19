'use strict';

var ADS_QUANTITY = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var OFFER_TITLES = ['Заголовок предложения 1', 'Заголовок предложения 2', 'Заголовок предложения 3', 'Заголовок предложения 4', 'Заголовок предложения 5', 'Заголовок предложения 6', 'Заголовок предложения 7', 'Заголовок предложения 8'];
var OFFER_ADDRESES = ['200, 130', '300, 185', '400, 250', '500, 350', '600, 450', '700, 350', '800, 250'];
var OFFER_PRICES = ['1500', '200', '2700', '800', '999', '8900', '1000', '9999'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_ROOMS = ['1', '2', '3', '4'];
var OFFER_GUESTS = ['1', '2', '3', '4', '5', '6', '7', '8'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEUTURES = [
  ['washer', 'elevator', 'conditioner'],
  ['wifi', 'dishwasher', 'parking'],
  ['wifi', 'parking', 'washer', 'conditioner']
];
var OFFER_DESCRIPTIONS = ['Строка с описанием 1', 'Строка с описанием 2', 'Строка с описанием 3', 'Строка с описанием 4', 'Строка с описанием 5', 'Строка с описанием 6', 'Строка с описанием 7', 'Строка с описанием 8'];
var OFFER_PHOTOS = [
  ['http://o0.github.io/assets/images/tokyo/hotel1.jpg, http://o0.github.io/assets/images/tokyo/hotel2.jpg'],
  ['http://o0.github.io/assets/images/tokyo/hotel2.jpg, http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  ['http://o0.github.io/assets/images/tokyo/hotel1.jpg, http://o0.github.io/assets/images/tokyo/hotel3.jpg']
];
var OFFER_LOCATION_X = ['200', '300', '400', '500', '600', '700', '800', '630'];
var OFFER_LOCATION_Y = ['130', '200', '270', '340', '430', '500', '570', '630'];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomValue = function (data) {
  var randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
};

// функция генерации случайных данных
var generateAds = function (quantity) {
  var ads = [];
  for (var i = 0; i < quantity; i++) {
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + [i + 1] + '.png'
      },
      'offer': {
        'title': getRandomValue(OFFER_TITLES),
        'address': getRandomValue(OFFER_ADDRESES),
        'price': getRandomValue(OFFER_PRICES),
        'type': getRandomValue(OFFER_TYPES),
        'rooms': getRandomValue(OFFER_ROOMS),
        'guests': getRandomValue(OFFER_GUESTS),
        'checkin': getRandomValue(OFFER_CHECKINS),
        'checkout': getRandomValue(OFFER_CHECKOUTS),
        'features': getRandomValue(OFFER_FEUTURES),
        'description': getRandomValue(OFFER_DESCRIPTIONS),
        'photos': getRandomValue(OFFER_PHOTOS)
      },
      'location': {
        'x': getRandomValue(OFFER_LOCATION_X),
        'y': getRandomValue(OFFER_LOCATION_Y)
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
