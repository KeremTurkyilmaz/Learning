/*
Write a function called doubleValues which accepts an array and 
returns a new array with all the values in the array passed to the function doubled
*/
function doubleValues(arr) {
  const results = [];
  arr.forEach((v) => results.push(v * 2));
  return results;
}
console.log(doubleValues([1, 2, 3]), [2, 4, 6]); //

/*
Write a function called onlyEvenValues which accepts an array 
and returns a new array with only the even values in the array passed to the function
*/
function onlyEvenValues(arr) {
  const results = [];
  arr.forEach((v) => (v % 2 === 0 ? results.push(v) : null));
  return results;
}
console.log(onlyEvenValues([5, 1, 2, 3, 10]), [2, 10]);
console.log(onlyEvenValues([1, 2, 3]), [2]);

/*
Write a function called showFirstAndLast which accepts
 an array of strings and returns a new array with only the first and last character of each string.
*/
function showFirstAndLast(arr) {
  let results = [];
  arr.forEach((s) => results.push(s[0] + s[s.length - 1]));
  return results;
}

console.log(showFirstAndLast(["colt", "matt", "tim", "udemy"]), [
  "ct",
  "mt",
  "tm",
  "uy",
]); //
console.log(showFirstAndLast(["hi", "goodbye", "smile"]), ["hi", "ge", "se"]);

/*
Write a function called addKeyAndValue which accepts an 
array of objects, a key, and a value and returns the array 
passed to the function with the new key and value added for each object 
 [
    { name: "Elie", title: "instructor" },
    { name: "Tim", title: "instructor" },
    { name: "Matt", title: "instructor" },
    { name: "Colt", title: "instructor" },
  ]
*/

function addKeyAndValue(arr, key, value) {
  arr.forEach((el) => {
    el[key] = value;
  });
  return arr;
}

console.log(
  addKeyAndValue(
    [{ name: "Elie" }, { name: "Tim" }, { name: "Matt" }, { name: "Colt" }],
    "title",
    "instructor"
  )
);

/*
Write a function called vowelCount which accepts a string 
and returns an object with the keys as the vowel and the 
values as the number of times the vowel appears in the string.
This function should be case insensitive so a lowercase 
letter and uppercase letter should count

Examples:
  vowelCount('Elie') // {e:2,i:1};
  vowelCount('Tim') // {i:1};
  vowelCount('Matt') // {a:1})
  vowelCount('hmmm') // {};
  vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
*/
function vowelCount(str) {
  let obj = {};
  const vowels = "aeiou";
  str.split("").forEach((s) => {
    const l = s.toLowerCase();
    if (vowels.includes(l)) {
      if (obj[l]) obj[l]++;
      else obj[l] = 1;
    }
  });
  return obj;
}

console.log(vowelCount("Elie"), { e: 2, i: 1 });
console.log(vowelCount("Tim"), { i: 1 });
console.log(vowelCount("Matt"), { a: 1 });
console.log(vowelCount("hmmm"), {});
console.log(vowelCount("I Am awesome and so are you"), {
  i: 1,
  a: 4,
  e: 3,
  o: 3,
  u: 1,
});
