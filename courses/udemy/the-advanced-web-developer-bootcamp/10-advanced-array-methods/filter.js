/*
Write a function called filterByValue which accepts an array 
of objects and a key and returns a new array with 
all the objects that contain that key.
*/

function filterByValue(arr, key) {
  return arr.filter((e) => e[key]);
}
console.log(
  filterByValue(
    [
      { first: "Elie", last: "Schoppik" },
      { first: "Tim", last: "Garcia", isCatOwner: true },
      { first: "Matt", last: "Lane" },
      { first: "Colt", last: "Steele", isCatOwner: true },
    ],
    "isCatOwner"
  )
);

/*
Write a function called find which accepts an array
 and a value and returns the first element in the 
 array that has the same value as the second 
 parameter or undefined if the value is not found 
 in the array.
*/

function find(arr, searchValue) {
  return arr.filter((s) => s === searchValue)[0];
}
console.log(find([1, 2, 3, 4, 5], 3), 3);
console.log(find([1, 2, 3, 4, 5], 10), undefined);

/*
Write a function called findInObj which 
accepts an array of objects, a key, and 
some value to search for and returns the 
first found value in the arrayt.
*/

function findInObj(arr, key, searchValue) {
  return arr.filter((el) => el[key] === searchValue)[0];
}
console.log(
  findInObj(
    [
      { first: "Elie", last: "Schoppik" },
      { first: "Tim", last: "Garcia", isCatOwner: true },
      { first: "Matt", last: "Lane" },
      { first: "Colt", last: "Steele", isCatOwner: true },
    ],
    "isCatOwner",
    true
  ),
  { first: "Tim", last: "Garcia", isCatOwner: true }
);

/*
Write a function called removeVowels which accepts 
a string and returns a new string with all of the 
vowels (both uppercased and lowercased) removed. 
Every character in the new string should be lowercased.
*/

function removeVowels(str) {
  return str
    .split("")
    .filter((l) => !"aeiou".includes(l.toLowerCase()))
    .join("")
    .toLowerCase();
}
console.log(removeVowels("Elie"), "l");
console.log(removeVowels("TIM"), "tm");
console.log(removeVowels("ZZZZZZ"), "zzzzzz");

/*
Write a function called doubleOddNumbers which
accepts an array and returns a new array with
all of the odd numbers doubled 
(HINT - you can use map and fitler to
double and then filter the odd numbers).
*/

function doubleOddNumbers(arr) {
  return arr.filter((e) => e % 2 !== 0).map((v) => v * 2);
}
console.log(doubleOddNumbers([1, 2, 3, 4, 5]), [2, 6, 10]);
console.log(doubleOddNumbers([4, 4, 4, 4, 4]), []);
