// mrnagydavid
function convertNumeralToText(numeral) {
  const ones        = ['zero',    'one',    'two',    'three',    'four',     'five',     'six',      'seven',      'eight',    'nine'];
  const teens       = ['ten',     'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',  'sixteen',  'seventeen',  'eighteen', 'nineteen'];
  const tens        = [undefined, 'ten',    'twenty', 'thirty',   'forty',   'fifty',    'sixty',    'seventy',    'eighty',   'ninety'];
  const orders      = [10**12,     10**9,     10**6,     10**3,      10**2];
  const orderValue  = ['trillion', 'billion', 'million', 'thousand', 'hundred'];

  function parseInt(number, orderIndex = -1) {
    const result = [];
    let div, mod;

    /* 99 -> infinity */
    if (number > 99) {
      const magnitudeIndex = orders.findIndex((order, ind) => {
        if (ind <= orderIndex) return false;      // we start 'testing' only the orders of magnitude from the intended index
        div = Math.floor(number / order);         // div > 0 -> we found the greatest order of magnitude that fits for the numeric value
        if (div > 0) {
          if (div < 10 && number > 1099 && number < 2000) {  // exceptional: American English Numerals -> 1100 ~ eleven hudnred, 1900 ~ nineteen hundred 
            return false;
          }
          return true;
        } else {
          return false;
        }                   
      });

      mod = number % orders[magnitudeIndex];
      const magnitude = orderValue[magnitudeIndex];
      result.push(parseInt(div, magnitudeIndex));
      result.push(magnitude);
      if (mod > 0) {
        if (mod < 100) {
          result.push('and');                 // exceptional: the big ones are connected to teens and ones with 'and'
        }
        result.push(parseInt(mod));           // only parse the right tree if there is something (mod > 0), otherwise we'd end up with 'zero'
      }

      return result.join(' ');

    /* 0 -> 99 */
    } else {
      /* 0 -> 9 */
      if (number < 10) {
        return ones[number]; 
      }
      /* 10 -> 19 */
      if (number > 9 && number < 20) {
        return teens[number - 10];
      }
      /* 20 -> 99 */
      if (number >= 20) {                   // exceptional: 20 - 99 numbers are hyphenated e.g. twenty-one
        div = Math.floor(number / 10);
        mod = number - div * 10;
        result.push(tens[div]);
        if (mod > 0) {
          result.push(ones[mod]);
        }
        return result.join('-');
      }
    }
  }

  return parseInt(numeral);
}