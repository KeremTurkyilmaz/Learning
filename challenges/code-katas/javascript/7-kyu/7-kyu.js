// https://www.codewars.com/kata/55f2b110f61eb01779000053/train/javascript
function getSum(a, b) {
  if (a === b) return a;
  let min = Math.min(a, b);
  let max = Math.max(a, b);
  let sum = 0;
  while (min <= max) {
    sum += min
    min++;
  }
  return sum
}









