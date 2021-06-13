// https://www.codewars.com/kata/514b92a657cdc65150000006/train/javascript
function solution(number) {
  let current = 0;
  const multiples = [];
  while (current < number) {
    if (current % 3 === 0 || current % 5 === 0) multiples.push(current);
    current++;
  }
  return multiples.reduce((acc, curr) => {
    return (acc += curr);
  }, 0);
}

// https://www.codewars.com/kata/546f922b54af40e1e90001da/javascript
// ASCII Table 
// https://naveenr.net/unicode-character-set-and-utf-8-utf-16-utf-32-encoding/
function alphabetPosition(text) {
  let results = "";
  for (let i = 0; i < text.length; i++) {
    var code = text.toLowerCase().charCodeAt(i);
    if (code >= 97 && code <= 122) results += code - 97 + 1 + " ";
  }
  return results.slice(0, results.length - 1);
}













