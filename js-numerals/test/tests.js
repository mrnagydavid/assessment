QUnit.module('test framework setup');

QUnit.test('function is accessible', (assert) => {
  assert.ok(convertNumeralToText);
});

/* -- */

function dictTest(arr, assert) {
  for (let i = 0; i < arr.length; i = i + 2) {
    assert.deepEqual(convertNumeralToText(arr[i]), arr[i+1], `${arr[i]} is ${arr[i]}`);
  }
}

QUnit.module('js-numeral');

QUnit.test('ones', (assert) => {
  const test = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  test.forEach((val, ind) => {
    assert.deepEqual(convertNumeralToText(ind), val, `${ind} is ${val}`);
  })
});

QUnit.test('teens', (assert) => {
  const test = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  test.forEach((val, ind) => {
    assert.deepEqual(convertNumeralToText(ind + 10), val, `${ind+10} is ${val}`);
  })
});

QUnit.test('tens', (assert) => {
  const test = [10, 'ten', 20, 'twenty', 30, 'thirty', 40, 'forty', 50, 'fifty', 60, 'sixty', 70, 'seventy', 80, 'eighty', 90, 'ninety'];
  dictTest(test, assert);
});

QUnit.test('20-99', (assert) => {
  const test = [20, 'twenty', 21, 'twenty-one', 32, 'thirty-two', 43, 'forty-three', 54, 'fifty-four', 65, 'sixty-five', 76, 'seventy-six', 87, 'eighty-seven', 98, 'ninety-eight'];
  dictTest(test, assert);
});

QUnit.test('10^n', (assert) => {
  const test = [
    10**2, 'one hundred',
    10**3, 'one thousand',
    10**4, 'ten thousand',
    10**5, 'one hundred thousand',
    10**6, 'one million',
    10**7, 'ten million',
    10**8, 'one hundred million',
    10**9, 'one billion',
    10**10, 'ten billion',
    10**11, 'one hundred billion',
    10**12, 'one trillion',
    10**16, 'ten thousand trillion'
  ];
  dictTest(test, assert);
});

QUnit.test('DiNa test cases', (assert) => {
  const test = [
    7,      'seven',
    42,     'forty-two',
    2001,   'two thousand and one',
    1999,   'nineteen hundred and ninety-nine',
    17999,  'seventeen thousand nine hundred and ninety-nine'
  ];
  dictTest(test, assert);
});

QUnit.test('Handle negatives', (assert) => {
  const test = [
    -7,      'minus seven',
    -42,     'minus forty-two',
    -2001,   'minus two thousand and one',
    -1999,   'minus nineteen hundred and ninety-nine',
    -17999,  'minus seventeen thousand nine hundred and ninety-nine'
  ];
  dictTest(test, assert);
});

QUnit.test('Convert text to number', (assert) => {
  const test = [
    '7',  'seven'
  ];
  dictTest(test, assert);
});

QUnit.test('Convert float to integer', (assert) => {
  const test = [
    7.6,  'seven'
  ];
  dictTest(test, assert);
});

QUnit.test('Throw error for malformed input', (assert) => {
  assert.throws(() => convertNumeralToText('x'));         // non numeric text
  assert.throws(() => convertNumeralToText({}));          // non numeric text
  assert.throws(() => convertNumeralToText(Number.NaN));  // NaN
  assert.throws(() => convertNumeralToText(Number.NEGATIVE_INFINITY));  // Infinity
  assert.throws(() => convertNumeralToText(Number.POSITIVE_INFINITY));  // Infinity
});