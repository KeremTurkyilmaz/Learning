/*
--------------------------------
Explicit Binding
--------------------------------
+--------------------+--------------------+-------------------+
| Method             | Parameters         | Invoke Immediatly |
+--------------------+--------------------+-------------------+
| Call               | thisArg,a,b,c,d    | Yes               |
+--------------------+--------------------+-------------------+
| Apply              | thisArg,[a,b,c,d]  | Yes               |
+--------------------+--------------------+-------------------+
| Bind               | thisArg,a,b,c,d    | No                |
+--------------------+--------------------+-------------------+
*/

/*
+--------------------+--------------------+-------------------+
| Call               | thisArg,a,b,c,d    | Yes               |
+--------------------+--------------------+-------------------+
*/
var person = {
  firstName: "Colt",
  dog: {
    sayHello: function () {
      return "Hello " + this.firstName;
    },
    determineContext: function () {
      return this === person;
    },
  },
};
// Notice that we do NOT invoke sayHello and determineContext
person.dog.sayHello.call(person); // Hello Colt
person.dog.determineContext.call(person); // True

function saluta() {
  return "Hi " + this.firstName;
}
var colt = { firstName: "Colt" };
var elie = { firstName: "Elie" };
saluta.call(colt); // Hi Colt
saluta.call(elie); // Hi Elie

/*
+--------------------+--------------------+-------------------+
| Apply              | thisArg,[a,b,c,d]  | Yes               |
+--------------------+--------------------+-------------------+
*/
const nums = [1, 2, 3, 4];

function addNumbers(a, b, c, d) {
  return this.firstName + " just calculated " + (a + b + c + d);
}
var colt = { firstName: "Colt" };
var elie = { firstName: "Elie" };
addNumbers.apply(colt, nums); //?

// Using apply to spread numbers array and calculate the highest number
Math.max.apply(this, nums); // 4

function sumValues(a, b, c) {
  return a + b + c;
}
sumValues.apply(this, nums); // 6

/*
+--------------------+--------------------+-------------------+
| Bind               | thisArg,a,b,c,d    | No                |
+--------------------+--------------------+-------------------+
*/
function addNumbers(a, b, c) {
  return this.firstName + " just calculated " + (a + b + c);
}
var matt = { firstName: "Matt" };
// Don't invoke the function
let mattCalc = addNumbers.bind(matt, 1, 2, 3);
// Invoke the function and get the result
mattCalc(); // 6


// SetTimeout
var colt = {
  firstName: 'Colt',
  sayHi: function(){
    setTimeout(function() {
      console.log('Hi ' + this.firstName)
    }, 2000)
  }
}
colt.sayHi() // Hi undefined (2000 milliseconds later)


var colt = {
  firstName: 'Colt',
  sayHi: function(){
    setTimeout(function() {
      console.log('Hi ' + this.firstName)
    }.bind(this), 2000)
  }
}
colt.sayHi() // Hi undefined (2000 milliseconds later)

