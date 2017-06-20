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
  // China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
  // Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.

  var length = cardNumber.length;
  // console.log('length is', length);
  var hasPrefix = false;
  var hasLength = false;

  var insertRange = function(start, end) {
    var arr = [];
      for (var i = start; i <= end; i++) {
        arr.push(i);
      }
    return arr;
  };

  var creditCards = [
    { name : 'Diner\'s Club', prefices : [38, 39], lengths : [14] },
    { name : 'American Express', prefices : [34, 37], lengths : [15]},
    { name : 'Switch', prefices : [4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759], lengths: [16, 18, 19]},
    { name : 'Visa', prefices : [4], lengths : [13, 16, 19]},
    { name : 'MasterCard', prefices : [51, 52, 53, 54, 55], lengths : [16]},
    { name : 'Discover', prefices : [6011, 644, 645, 646, 647, 648, 649, 65], lengths : [16, 19]},
    { name : 'Maestro', prefices : [5018, 5020, 5038, 6304], lengths : [12, 13, 14, 15, 16, 17, 18, 19]},
    { name : 'China UnionPay', prefices : [624, 625, 626, 6282, 6283, 6284, 6285, 6286, 6287, 6288].concat(insertRange(622126,622925)), lengths: [16, 17, 18, 19]}
  ];

  for (var i = 0; i < creditCards.length; i++) {
    var cardInfo = creditCards[i];
    for (var k = 0; k < cardInfo.prefices.length; k++) {
      var prefixQuery = cardInfo.prefices[k];
      var prefix = Number(cardNumber.slice(0, prefixQuery.toString().length));
      if (prefix === prefixQuery) {
        for (var m = 0; m < cardInfo.lengths.length; m++) {
          if (length === cardInfo.lengths[m]) {
            return creditCards[i].name;
          }
        }
      }
    }
  }
  return 'Card not found';
};
