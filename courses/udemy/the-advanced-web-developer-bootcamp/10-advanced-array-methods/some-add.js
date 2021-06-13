/*
Write a function called hasOddNumber which accepts 
an array and returns true if the array contains 
at least one odd number, otherwise it returns false.
*/

function hasOddNumber(arr) {
  return arr.some((e) => e % 2 !== 0);
}
console.log(hasOddNumber([1, 2, 2, 2, 2, 2, 4]), true);
console.log(hasOddNumber([2, 2, 2, 2, 2, 4]), false);

/*
Write a function called hasAZero which accepts a 
number and returns true if that number contains 
at least one zero. Otherwise, the function should return false
*/
function hasAZero(num) {
  return num
    .toString()
    .split("")
    .some((e) => e === "0");
}
console.log(hasAZero(3332123213101232321), true);
console.log(hasAZero(1212121), false);

/*
Write a function called hasOnlyOddNumbers which
accepts an array and returns true if every 
single number in the array is odd.
If any of the values in the array are
not odd, the function should return false. 
*/
function hasOnlyOddNumbers(arr) {
  return arr.every((e) => e % 2 !== 0);
}
console.log(hasOnlyOddNumbers([1, 3, 5, 7]), true);
console.log(hasOnlyOddNumbers([1, 2, 3, 5, 7]), false);

/*
Write a function called hasNoDuplicates which 
accepts an array and returns true if there 
are no duplicate values (more than one 
element in the array that has the same 
value as another). If there are any 
duplicates, the function should return false.
*/

function hasNoDuplicates(arr) {
  return arr.every((e) => arr.indexOf(e) === arr.lastIndexOf(e));
}
console.log(hasNoDuplicates([1, 2, 3, 1]), false);
console.log(hasNoDuplicates([1, 2, 3]), true);

/*
Write a function called hasCertainKey which accepts
an array of objects and a key, and returns 
true if every single object in the array 
contains that key. Otherwise it should 
return false.
*/

function hasCertainKey(arr, key) {
  return arr.every((e) => e[key]);
}
var arr = [
  { title: "Instructor", first: "Elie", last: "Schoppik" },
  { title: "Instructor", first: "Tim", last: "Garcia", isCatOwner: true },
  { title: "Instructor", first: "Matt", last: "Lane" },
  { title: "Instructor", first: "Colt", last: "Steele", isCatOwner: true },
];
console.log(hasCertainKey(arr, "first"), true);
console.log(hasCertainKey(arr, "isCatOwner"), false);

/*
Write a function called hasCertainValue which accepts
an array of objects and a key, and a value,
and returns true if every single object in 
the array contains that value for the 
specific key. Otherwise it should return false.
*/

function hasCertainValue(arr, key, searchValue) {
  return arr.every((el) => el[key] === searchValue);
}
var arr = [
  { title: "Instructor", first: "Elie", last: "Schoppik" },
  { title: "Instructor", first: "Tim", last: "Garcia", isCatOwner: true },
  { title: "Instructor", first: "Matt", last: "Lane" },
  { title: "Instructor", first: "Colt", last: "Steele", isCatOwner: true },
];
console.log(hasCertainValue(arr, "title", "Instructor"), true);
console.log(hasCertainValue(arr, "first", "Elie"), false);
