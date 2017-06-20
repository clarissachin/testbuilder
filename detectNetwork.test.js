/*
 * You'll eventually be given instructions how to use this file
 * If you want to use it before then, you'll have to figure it out yourself
 */

// You don't actually want to fill *this* value in on line 9, but you'll see
// other places in this file where you'll replace the FILL_ME_IN with a
// different value.
// var FILL_ME_IN = 'Fill this value in';

var should = chai.should();

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

// Original method
// function getPrefices(creditCard) {
//   var prefices;
//   for (var i = 0; i < creditCards.length; i++) {
//     if (creditCards[i].name === creditCard) {
//       prefices = creditCards[i].prefices;
//     }
//   }
//   return prefices;
// }

// function getLengths(creditCard) {
//   var lengths;
//   for (var k = 0; k < creditCards.length; k++) {
//     if (creditCards[k].name === creditCard) {
//       lengths = creditCards[k].lengths;
//     }
//   }
//   return lengths;
// }

// Refactored functions below

function getPrefices(creditCard) {
  return creditCards.find(function(card) {
    return card.name === creditCard;
  }).prefices;
}

function getLengths(creditCard) {
  return creditCards.find(function(card) {
    return card.name === creditCard;
  }).lengths;
}

function generateNumber(prefix, length) {
  var numString = prefix.toString();
  for (var m = 0; m < length - prefix.toString().length; m++) {
    var randNum = Math.floor(Math.random() * 10);
    numString += randNum.toString();
  }
  return numString;
}

function generateTests(testCardName) {
  var cardPrefices = getPrefices(testCardName);
  var cardLengths = getLengths(testCardName);

  cardPrefices.forEach(function(prefix) {
    cardLengths.forEach(function(length) {
      var randomCardNum = generateNumber(prefix, length);
      // console.log('randomCardNum.length === length:', randomCardNum.length === length);
      // console.log('randomCardNum prefix === prefix:', randomCardNum.slice(0, prefix.toString().length) === prefix.toString());
      it('has a prefix of ' + prefix + ' and a length of ' + length, function() {
        detectNetwork(randomCardNum).should.equal(testCardName);
        // console.log('card is:', testCardName, '& randomCardNum is', randomCardNum);
      });
    });
  });
}
// describe('Introduction to Mocha Tests - READ ME FIRST', function() {
//   // A Mocha test is just a function!
//   // If the function throws an error when run, it fails.
//   // If it doesn't throw an error when run, it doesn't fail.
//   // To read more about mocha, visit mochajs.org
//
//   // Once you've read and understood this section, please comment it out.
//   // You will not be able to proceed with a failing test.
//
//   // it('Throws an error so it fails', function() {
//   //   throw new Error('Delete me!');
//   // });
//
//   it('Doesn\'t throw an error, so it doesn\'t fail', function() {
//     // This test doesn't really test anything at all! It will pass no matter what.
//     var even = function(num){
//       return num / 2 === 0;
//     }
//     return even(10) === true;
//   });
//
//   // In tests, we want to compare the expected behavior to the actual behavior.
//   // A test should only fail if the expected behavior doesn't match the actual.
//   it('Throws an error when expected behavior does not match actual behavior', function() {
//     var even = function(num){
//       return num % 2 === 0;
//     }
//
//     if(even(10) !== true) {
//       throw new Error('10 should be even!');
//     }
//   });
// });

describe('Diner\'s Club', function() {
  // Be careful, tests can have bugs too...
  generateTests('Diner\'s Club');
});

describe('American Express', function() {
  generateTests('American Express');
  // It can get annoying to keep typing the if/throw, so here is a
  // helper function to throw an error if the input statement isn't true.
  // var assert = function(isTrue) {
  //   if(!isTrue) {
  //     throw new Error('Test failed');
  //   }
  //
  // };
  //
  // it('has a prefix of 34 and a length of 15', function() {
  //   assert(detectNetwork('343456789012345') === 'American Express');
  // });
  //
  // it('has a prefix of 37 and a length of 15', function() {
  //   assert(detectNetwork('373456789012345') === 'American Express');
  // });
});

describe('Visa', function() {
  // Chai is an entire library of helper functions for tests!
  // Chai provides an assert that acts the same as our previous assert.
  // Search the documentation to figure out how to access it.
  //   http://chaijs.com;
  generateTests('Visa');
  // it('has a prefix of 4 and a length of 13', function() {
  //   assert(detectNetwork('4123456789012') === 'Visa');
  // });
  //
  // it('has a prefix of 4 and a length of 16', function() {
  //   assert(detectNetwork('4123456789012345') === 'Visa');
  // });
  //
  // it('has a prefix of 4 and a length of 19', function() {
  //   assert(detectNetwork('4123456789012345678') === 'Visa');
  // });
});

describe('MasterCard', function() {
  generateTests('MasterCard');
  // Chai lets you write more human-readable tests that throw helpful errors.
  // Expect syntax is one way to do this, but there are others.
  // If you want to know more, check out the documentation.
  //   http://chaijs.com/api/bdd/
  // var expect = chai.expect;
  //
  // it('has a prefix of 51 and a length of 16', function() {
  //   expect(detectNetwork('5112345678901234')).to.equal('MasterCard');
  // });
  //
  // it('has a prefix of 52 and a length of 16', function() {
  //   expect(detectNetwork('5212345678901234')).to.equal('MasterCard');
  // });
  //
  // it('has a prefix of 53 and a length of 16', function() {
  //   expect(detectNetwork('5312345678901234')).to.equal('MasterCard');
  // });


  // You can also use should instead of expect, which changes the style
  // slightly. It really doesn't matter which one you use - check out
  // http://chaijs.com/guide/styles/ for more info, but it's important
  // to be consistent (unlike in this file, where we use BOTH expect
  // and should, but that's just for learning), so once you've gotten
  // these tests to pass using should syntax, refactor your tests to
  // use either expect or should, but not both.
  // var should = chai.should();
  //
  // it('has a prefix of 54 and a length of 16', function() {
  //   detectNetwork('5412345678901234').should.equal('MasterCard');
  // });
  //
  // it('has a prefix of 55 and a length of 16', function() {
  //   detectNetwork('5512345678901234').should.equal('MasterCard');
  // })

});

describe('Discover', function() {
  generateTests('Discover');
});

describe('Maestro', function() {
  generateTests('Maestro');
});

describe('China UnionPay', function() {
  generateTests('China UnionPay');
});

describe('Switch', function() {
  generateTests('Switch');
});
