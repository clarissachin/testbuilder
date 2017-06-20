// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long
  //Visa always has a prefix of 4 and a length of 13, 16, or 19.
  // MasterCard always has a prefix of 51, 52, 53, 54, or 55 and a length of 16.
  // Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
  // Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.
  var length = cardNumber.length;
  var hasPrefix = false;
  var hasLength = false;

  var creditCards = [
    { name : 'Diner\'s Club', prefices : [38, 39], lengths : [14] },
    { name : 'American Express', prefices : [34, 37], lengths : [15]},
    { name : 'Visa', prefices : [4], lengths : [13, 16, 19]},
    { name : 'MasterCard', prefices : [51, 52, 53, 54, 55], lengths : [16]},
    { name : 'Discover', prefices : [6011, 644, 645, 646, 647, 648, 649, 65], lengths : [16, 19]},
    { name : 'Maestro', prefices : [5018, 5020, 5038, 6304], lengths : [12, 13, 14, 15, 16, 17, 18, 19]}
  ];

  for (var i = 0; i < creditCards.length; i++) {
    var cardInfo = creditCards[i];
    for (var m = 0; m < cardInfo.lengths.length; m++) {
      if (length === cardInfo.lengths[m]) {
        hasLength = true;
      }
    }

    if (hasLength) {
      for (var k = 0; k < cardInfo.prefices.length; k++) {
        var prefixQuery = cardInfo.prefices[k];
        // console.log('prefixQuery.length is', prefixQuery.toString().length);
        var prefix = Number(cardNumber.slice(0, prefixQuery.toString().length));
        // console.log('prefix is', prefix);
        if (prefix === prefixQuery) {
          hasPrefix = true;
        }
      }
    }

    if (hasPrefix && hasLength) {
      return creditCards[i].name;
    }
  }
};

// console.log(detectNetwork('38345678901234')); // (Diner's Club)
// console.log(detectNetwork('39345678901234')); // (Diner's Club)
// console.log(detectNetwork('343456789012345')); //(American Express)
// console.log(detectNetwork('373456789012345')); //(American Express)
// console.log(detectNetwork('4123456789012')); // Visa
// console.log(detectNetwork('4123456789012345')); // Visa
// console.log(detectNetwork('4123456789012345678')); // Visa
// console.log(detectNetwork('5112345678901234')); // MasterCard
// console.log(detectNetwork('5212345678901234')); // MasterCard
// console.log(detectNetwork('5312345678901234')); // MasterCard
// console.log(detectNetwork('5412345678901234')); // MasterCard
// console.log(detectNetwork('5512345678901234')); // MasterCard
