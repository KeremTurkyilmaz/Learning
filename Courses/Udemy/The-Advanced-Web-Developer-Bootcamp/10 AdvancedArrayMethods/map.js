/*
Write a function called doubleValues which accepts an array 
and returns a new array with all the values in 
the array passed to the function doubled
*/

function doubleValues(arr) {
  return arr.map((v) => v * 2);
}
console.log(doubleValues([1, 2, 3]), [2, 4, 6]);
console.log(doubleValues([1, -2, -3]), [2, -4, -6]);

/*
Write a function called valTimesIndex which accepts 
an array and returns a new array with each value 
multiplied by the index it is currently at in the array.
*/
function valTimesIndex(arr) {
  return arr.map((v, i) => v * i);
}
console.log(valTimesIndex([1, 2, 3]), [0, 2, 6]);
console.log(valTimesIndex([1, -2, -3]), [0, -2, -6]);

/*
Write a function called extractKey which accepts an 
array of objects and some key and returns a new 
array with the value of that key in each object.
*/
function extractKey(arr, key) {
  return arr.map((v) => v[key]);
}
console.log(
  extractKey(
    [{ name: "Elie" }, { name: "Tim" }, { name: "Matt" }, { name: "Colt" }],
    "name"
  ),
  ["Elie", "Tim", "Matt", "Colt"]
);

/*
Write a function called extractFullName which accepts 
an array of objects and returns a new array with 
the value of the key with a name of "first" and 
the value of a key with the name of  "last" in 
each object, concatenated together with a space. 
*/

function extractFullName(arr) {
  return arr.map((n) => `${n.first} ${n.last}`);
}

console.log(
  extractFullName([
    { first: "Elie", last: "Schoppik" },
    { first: "Tim", last: "Garcia" },
    { first: "Matt", last: "Lane" },
    { first: "Colt", last: "Steele" },
  ]),
  ["Elie Schoppik", "Tim Garcia", "Matt Lane", "Colt Steele"]
);
